import { LeaveRequest, LeaveBalance } from "@/types/leave";
import { getStorage, setStorage, KEYS } from "./api";
import { INITIAL_LEAVES } from "@/lib/constants";

export const LeaveService = {
  getAll(): LeaveRequest[] {
    return getStorage<LeaveRequest[]>(KEYS.LEAVES, INITIAL_LEAVES);
  },

  getByEmployee(employeeId: string): LeaveRequest[] {
    const list = this.getAll();
    return list.filter((r) => r.employeeId === employeeId);
  },

  getBalances(employeeId: string): LeaveBalance {
    const requests = this.getByEmployee(employeeId);
    const approvedCasual = requests
      .filter((r) => r.leaveType === "Casual Leave" && r.status === "Approved")
      .reduce((sum, r) => sum + r.totalDays, 0);

    const approvedSick = requests
      .filter((r) => r.leaveType === "Sick Leave" && r.status === "Approved")
      .reduce((sum, r) => sum + r.totalDays, 0);

    const approvedEarned = requests
      .filter((r) => r.leaveType === "Earned Leave" && r.status === "Approved")
      .reduce((sum, r) => sum + r.totalDays, 0);

    return {
      casual: { total: 12, used: approvedCasual },
      sick: { total: 10, used: approvedSick },
      earned: { total: 15, used: approvedEarned },
    };
  },

  create(data: Omit<LeaveRequest, "id" | "appliedOn" | "status">): LeaveRequest {
    const list = this.getAll();
    const newRequest: LeaveRequest = {
      ...data,
      id: `lv-${Date.now()}`,
      appliedOn: new Date().toISOString().split("T")[0],
      status: "Pending",
    };
    setStorage(KEYS.LEAVES, [newRequest, ...list]);
    return newRequest;
  },

  updateStatus(id: string, status: "Approved" | "Rejected", reviewerName: string, comment?: string): LeaveRequest | null {
    const list = this.getAll();
    const index = list.findIndex((r) => r.id === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      status,
      reviewedBy: reviewerName,
      reviewComment: comment,
    };

    setStorage(KEYS.LEAVES, list);
    return list[index];
  },
};

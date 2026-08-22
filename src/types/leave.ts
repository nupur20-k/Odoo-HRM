export type LeaveType = 'Casual Leave' | 'Sick Leave' | 'Earned Leave' | 'Maternity Leave' | 'Unpaid Leave';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  department: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  reviewedBy?: string;
  reviewComment?: string;
}

export interface LeaveBalance {
  casual: { total: number; used: number };
  sick: { total: number; used: number };
  earned: { total: number; used: number };
}

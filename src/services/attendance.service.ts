import { AttendanceRecord, ClockState } from "@/types/attendance";
import { getStorage, setStorage, KEYS } from "./api";
import { INITIAL_ATTENDANCE } from "@/lib/constants";

export const AttendanceService = {
  getAll(): AttendanceRecord[] {
    return getStorage<AttendanceRecord[]>(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  },

  getByEmployee(employeeId: string): AttendanceRecord[] {
    const list = this.getAll();
    return list.filter((r) => r.employeeId === employeeId);
  },

  getClockState(employeeId: string): ClockState {
    const defaultState: ClockState = { isClockedIn: false, elapsedSeconds: 0 };
    const saved = getStorage<Record<string, ClockState>>(KEYS.CLOCK_STATE, {});
    return saved[employeeId] || defaultState;
  },

  saveClockState(employeeId: string, state: ClockState): void {
    const saved = getStorage<Record<string, ClockState>>(KEYS.CLOCK_STATE, {});
    saved[employeeId] = state;
    setStorage(KEYS.CLOCK_STATE, saved);
  },

  clockIn(employeeId: string, employeeName: string): AttendanceRecord {
    const today = new Date().toISOString().split("T")[0];
    const checkInTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    const list = this.getAll();

    const record: AttendanceRecord = {
      id: `att-${Date.now()}`,
      employeeId,
      employeeName,
      date: today,
      checkIn: checkInTime,
      status: "Present",
      notes: "Self Clock-in",
    };

    setStorage(KEYS.ATTENDANCE, [record, ...list]);
    this.saveClockState(employeeId, {
      isClockedIn: true,
      checkInTime,
      elapsedSeconds: 1,
    });

    return record;
  },

  clockOut(employeeId: string): AttendanceRecord | null {
    const today = new Date().toISOString().split("T")[0];
    const checkOutTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    const list = this.getAll();

    const index = list.findIndex((r) => r.employeeId === employeeId && r.date === today);
    if (index === -1) return null;

    const clockState = this.getClockState(employeeId);
    const totalHours = Number((clockState.elapsedSeconds / 3600).toFixed(1)) || 8.0;

    list[index] = {
      ...list[index],
      checkOut: checkOutTime,
      totalHours: totalHours > 0 ? totalHours : 7.5,
    };

    setStorage(KEYS.ATTENDANCE, list);
    this.saveClockState(employeeId, {
      isClockedIn: false,
      elapsedSeconds: 0,
    });

    return list[index];
  },

  updateRecord(id: string, updates: Partial<AttendanceRecord>): AttendanceRecord | null {
    const list = this.getAll();
    const index = list.findIndex((r) => r.id === id);
    if (index === -1) return null;

    list[index] = { ...list[index], ...updates };
    setStorage(KEYS.ATTENDANCE, list);
    return list[index];
  },
};

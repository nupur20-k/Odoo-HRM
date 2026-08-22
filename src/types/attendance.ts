export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Half-day' | 'On Leave';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string; // YYYY-MM-DD
  checkIn: string; // HH:mm:ss
  checkOut?: string; // HH:mm:ss
  totalHours?: number;
  status: AttendanceStatus;
  notes?: string;
}

export interface ClockState {
  isClockedIn: boolean;
  checkInTime?: string;
  elapsedSeconds: number;
}

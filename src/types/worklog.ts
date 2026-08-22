export interface WorkEntry {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  project: string;
  task: string;
  activity: string;
  durationMinutes: number; // e.g. 200 = 3h 20m
  employeeId?: string;
  employeeName?: string;
  createdAt?: string;
}

export interface DayWorkSummary {
  date: string;
  workingMinutes: number; // e.g. 445 = 7h 25m
  loggedMinutes: number;  // e.g. 330 = 5h 30m
  entries: WorkEntry[];
  isComplete: boolean;
}

export interface WeeklyWorkSummary {
  startDate: string;
  endDate: string;
  totalWorkingMinutes: number;
  totalLoggedMinutes: number;
  projectCount: number;
  completionPercentage: number;
  projectBreakdown: { project: string; minutes: number }[];
}

export interface EmployeeWorkOverview {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  department: string;
  status: "complete" | "incomplete" | "missing";
  loggedMinutes: number;
  expectedMinutes: number;
  lastEntry?: string;
  completionPercentage: number;
}

import { WorkEntry, DayWorkSummary, WeeklyWorkSummary, EmployeeWorkOverview } from "@/types/worklog";
import { getStorage, setStorage, KEYS } from "./api";

const WORK_LOG_STORAGE_KEY = "dayflow_work_entries_v1";

export const DEFAULT_WORK_ENTRIES: WorkEntry[] = [
  {
    id: "we-101",
    date: "2026-08-22",
    project: "Dayflow",
    task: "Employee Dashboard",
    activity: "Attendance UI & Smart Work Log integration",
    durationMinutes: 200, // 3h 20m
    employeeId: "emp-101",
    employeeName: "Priya Shah",
  },
  {
    id: "we-102",
    date: "2026-08-22",
    project: "CampusConnect",
    task: "Community Feed",
    activity: "Frontend component development & API integration",
    durationMinutes: 130, // 2h 10m
    employeeId: "emp-101",
    employeeName: "Priya Shah",
  },
  {
    id: "we-103",
    date: "2026-08-21",
    project: "Dayflow",
    task: "Leave Approval Workflow",
    activity: "Manager leave request approval table UI",
    durationMinutes: 240, // 4h 00m
    employeeId: "emp-101",
    employeeName: "Priya Shah",
  },
  {
    id: "we-104",
    date: "2026-08-21",
    project: "Smart Parking",
    task: "Slot Reservation Engine",
    activity: "Real-time occupancy map component",
    durationMinutes: 210, // 3h 30m
    employeeId: "emp-101",
    employeeName: "Priya Shah",
  },
  {
    id: "we-105",
    date: "2026-08-20",
    project: "Dayflow",
    task: "Payroll Visibility Module",
    activity: "Salary slip download modal and tax breakdown",
    durationMinutes: 270, // 4h 30m
    employeeId: "emp-101",
    employeeName: "Priya Shah",
  },
  {
    id: "we-106",
    date: "2026-08-19",
    project: "CampusConnect",
    task: "Student Authentication",
    activity: "OAuth2 login flow & password reset screen",
    durationMinutes: 300, // 5h 00m
    employeeId: "emp-101",
    employeeName: "Priya Shah",
  },
  {
    id: "we-107",
    date: "2026-08-18",
    project: "Dayflow",
    task: "Employee Profile Page",
    activity: "Edit details form and avatar upload widget",
    durationMinutes: 310, // 5h 10m
    employeeId: "emp-101",
    employeeName: "Priya Shah",
  },
];

export const WorkLogService = {
  getEntries(): WorkEntry[] {
    return getStorage<WorkEntry[]>(WORK_LOG_STORAGE_KEY, DEFAULT_WORK_ENTRIES);
  },

  saveEntries(entries: WorkEntry[]): void {
    setStorage(WORK_LOG_STORAGE_KEY, entries);
  },

  addEntry(entry: Omit<WorkEntry, "id" | "date"> & { date?: string }): WorkEntry {
    const entries = this.getEntries();
    const newEntry: WorkEntry = {
      ...entry,
      id: `we-${Date.now()}`,
      date: entry.date || new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };
    const updated = [newEntry, ...entries];
    this.saveEntries(updated);
    return newEntry;
  },

  updateEntry(id: string, updatedFields: Partial<WorkEntry>): WorkEntry | null {
    const entries = this.getEntries();
    const index = entries.findIndex((e) => e.id === id);
    if (index === -1) return null;
    entries[index] = { ...entries[index], ...updatedFields };
    this.saveEntries(entries);
    return entries[index];
  },

  deleteEntry(id: string): void {
    const entries = this.getEntries();
    const filtered = entries.filter((e) => e.id !== id);
    this.saveEntries(filtered);
  },

  formatMinutes(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  },

  parseNaturalLanguage(text: string): {
    project: string;
    task: string;
    activity: string;
    suggestedMinutes: number;
    suggestedFormat: string;
  } {
    const lower = text.toLowerCase();
    let project = "Dayflow";
    if (lower.includes("campus") || lower.includes("connect") || lower.includes("feed")) {
      project = "CampusConnect";
    } else if (lower.includes("parking") || lower.includes("slot")) {
      project = "Smart Parking";
    } else if (lower.includes("other") || lower.includes("meeting") || lower.includes("sync")) {
      project = "Other";
    }

    let task = "Work Log Entry";
    if (lower.includes("dashboard")) task = "Employee Dashboard";
    else if (lower.includes("attendance")) task = "Attendance Tracking";
    else if (lower.includes("leave")) task = "Leave Management";
    else if (lower.includes("payroll")) task = "Payroll System";
    else if (lower.includes("profile")) task = "Employee Profile";
    else if (lower.includes("auth") || lower.includes("login")) task = "Authentication";

    let activity = text.trim();
    if (activity.length > 80) {
      activity = activity.substring(0, 77) + "...";
    }

    // Estimate duration
    let minutes = 200; // 3h 20m default
    const hourMatch = lower.match(/(\d+(\.\d+)?)\s*(h|hr|hours)/);
    if (hourMatch) {
      minutes = Math.round(parseFloat(hourMatch[1]) * 60);
    }

    return {
      project,
      task,
      activity: activity || "Task development and UI bug fixes",
      suggestedMinutes: minutes,
      suggestedFormat: this.formatMinutes(minutes),
    };
  },

  getHRWorkOverview(): EmployeeWorkOverview[] {
    return [
      {
        id: "emp-101",
        name: "Priya Shah",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        role: "Senior Product Designer",
        department: "Design Team",
        status: "complete",
        loggedMinutes: 330, // 5h 30m
        expectedMinutes: 445, // 7h 25m
        completionPercentage: 100,
      },
      {
        id: "emp-102",
        name: "Rahul Sharma",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        role: "Backend Engineer",
        department: "Engineering",
        status: "missing",
        loggedMinutes: 0,
        expectedMinutes: 480,
        completionPercentage: 0,
      },
      {
        id: "emp-103",
        name: "Priya Patil",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        role: "UI/UX Designer",
        department: "Design",
        status: "incomplete",
        loggedMinutes: 130, // 2h 10m
        expectedMinutes: 480, // 8h
        completionPercentage: 27,
      },
      {
        id: "emp-104",
        name: "Amit Joshi",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        role: "Fullstack Developer",
        department: "Engineering",
        status: "complete",
        loggedMinutes: 465, // 7h 45m
        expectedMinutes: 480,
        completionPercentage: 97,
      },
      {
        id: "emp-105",
        name: "Nupur Kulkarni",
        avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
        role: "Frontend Developer",
        department: "Engineering",
        status: "complete",
        loggedMinutes: 420, // 7h 00m
        expectedMinutes: 480,
        completionPercentage: 92,
      },
    ];
  },

  generateAISummary(employeeName: string): string {
    return `Most of ${employeeName}'s activity this week was focused on the Dayflow employee dashboard and attendance module. The work log is 92% complete, with no major missing entries. High productivity recorded across core sprint deliverables.`;
  },
};

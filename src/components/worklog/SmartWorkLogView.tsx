"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Save,
  Trash2,
  Plus,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WorkLogService } from "@/services/worklog.service";

export interface TimesheetRow {
  id: string;
  dayIndex: number;
  dateNum: number;
  dayName: string;
  month: string;
  project: string;
  hoursMinutes: number; // in minutes
  activity: string;
  isSaved?: boolean;
}

export function SmartWorkLogView() {
  const [naturalInput, setNaturalInput] = useState("Worked on employee dashboard and fixed attendance UI");
  const [weekRange, setWeekRange] = useState("Aug 17 – Aug 23");
  const [lastSaved, setLastSaved] = useState("Just now");
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Attendance & Time calculations (8h 52m working time = 532 minutes)
  const attendanceWorkingMinutes = 532; // 8h 52m

  // Natural language smart parsing state
  const parsed = WorkLogService.parseNaturalLanguage(naturalInput);
  const [selectedProject, setSelectedProject] = useState(parsed.project);
  const [selectedTask, setSelectedTask] = useState(parsed.task);
  const [durationMins, setDurationMins] = useState(200); // 3h 20m

  // 7 Days Weekly Timesheet Table Rows
  const initialRows: TimesheetRow[] = [
    {
      id: "ts-1",
      dayIndex: 1,
      dateNum: 17,
      dayName: "Mon",
      month: "Aug",
      project: "Dayflow",
      hoursMinutes: 200, // 3h 20m
      activity: "Worked on employee dashboard and attendance UI",
      isSaved: true,
    },
    {
      id: "ts-2",
      dayIndex: 2,
      dateNum: 18,
      dayName: "Tue",
      month: "Aug",
      project: "CampusConnect",
      hoursMinutes: 130, // 2h 10m
      activity: "Community feed frontend component development",
      isSaved: true,
    },
    {
      id: "ts-3",
      dayIndex: 3,
      dateNum: 19,
      dayName: "Wed",
      month: "Aug",
      project: "Dayflow",
      hoursMinutes: 270, // 4h 30m
      activity: "Payroll visibility module and tax slip modal",
      isSaved: true,
    },
    {
      id: "ts-4",
      dayIndex: 4,
      dateNum: 20,
      dayName: "Thu",
      month: "Aug",
      project: "Smart Parking",
      hoursMinutes: 210, // 3h 30m
      activity: "Real-time parking slot reservation engine component",
      isSaved: true,
    },
    {
      id: "ts-5",
      dayIndex: 5,
      dateNum: 21,
      dayName: "Fri",
      month: "Aug",
      project: "Dayflow",
      hoursMinutes: 240, // 4h 00m
      activity: "HR console work overview dashboard & AI summary card",
      isSaved: true,
    },
    {
      id: "ts-6",
      dayIndex: 6,
      dateNum: 22,
      dayName: "Sat",
      month: "Aug",
      project: "Select Project",
      hoursMinutes: 0,
      activity: "",
      isSaved: false,
    },
    {
      id: "ts-7",
      dayIndex: 7,
      dateNum: 23,
      dayName: "Sun",
      month: "Aug",
      project: "Select Project",
      hoursMinutes: 0,
      activity: "",
      isSaved: false,
    },
  ];

  const [rows, setRows] = useState<TimesheetRow[]>(initialRows);

  const handleRowChange = (id: string, field: keyof TimesheetRow, value: any) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value, isSaved: false } : row))
    );
    setLastSaved("Unsaved changes");
  };

  const handleSaveRow = (id: string) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, isSaved: true } : row))
    );
    setLastSaved("Just now");
  };

  const handleClearRow = (id: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, project: "Select Project", hoursMinutes: 0, activity: "", isSaved: false }
          : row
      )
    );
    setLastSaved("Just now");
  };

  // Update project auto-detection when user types
  const handleInputChange = (val: string) => {
    setNaturalInput(val);
    setIsConfirmed(false);
    const newParsed = WorkLogService.parseNaturalLanguage(val);
    setSelectedProject(newParsed.project);
    setSelectedTask(newParsed.task);
  };

  const handleConfirmAndAdd = () => {
    if (!naturalInput.trim()) return;
    // Fill first empty row or row 6 (Sat)
    const emptyIndex = rows.findIndex((r) => r.hoursMinutes === 0 || !r.activity);
    const targetIdx = emptyIndex !== -1 ? emptyIndex : 5; // Sat row by default

    setRows((prev) => {
      const copy = [...prev];
      copy[targetIdx] = {
        ...copy[targetIdx],
        project: selectedProject,
        hoursMinutes: durationMins,
        activity: naturalInput.trim(),
        isSaved: true,
      };
      return copy;
    });

    setIsConfirmed(true);
    setLastSaved("Just now");
    setTimeout(() => setIsConfirmed(false), 3000);
  };

  const handleContinueRecent = () => {
    setNaturalInput("Worked on employee dashboard and fixed attendance UI");
    const newParsed = WorkLogService.parseNaturalLanguage("Worked on employee dashboard and fixed attendance UI");
    setSelectedProject(newParsed.project);
    setSelectedTask(newParsed.task);
    setDurationMins(200);
    setIsConfirmed(false);
  };

  const totalLoggedMinutes = rows.reduce((acc, curr) => acc + (curr.hoursMinutes || 0), 0);
  const unloggedMinutes = Math.max(0, attendanceWorkingMinutes - totalLoggedMinutes);
  const completionPercentage = Math.min(100, Math.round((totalLoggedMinutes / attendanceWorkingMinutes) * 100));
  const isComplete = unloggedMinutes <= 30;

  return (
    <div className="space-y-6 font-sans text-[#241B35]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#5B3778] uppercase tracking-wider font-sora">
            Smart Work Log
          </div>
          <h1 className="text-2xl font-bold text-[#241B35] font-sora mt-0.5">My Work Log</h1>
          <p className="text-xs text-[#6E637F] mt-0.5 font-medium">
            Log and track your daily work hours and activities.
          </p>
        </div>

        {/* Date Selector Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-1.5 bg-white border border-[#E6E0F0] rounded-2xl px-3 py-1.5 shadow-sm">
            <button className="p-1 hover:bg-[#F5F3FA] rounded-xl text-[#6E637F] hover:text-[#241B35] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-[#241B35] font-sora px-2">{weekRange}</span>
            <button className="p-1 hover:bg-[#F5F3FA] rounded-xl text-[#6E637F] hover:text-[#241B35] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-[#5B3778] font-mono">
              {WorkLogService.formatMinutes(totalLoggedMinutes)} logged
            </div>
            <div className="text-[10px] text-[#0FA98C] font-medium flex items-center justify-end gap-1">
              <CheckCircle2 className="w-3 h-3" /> Saved automatically ({lastSaved})
            </div>
          </div>
        </div>
      </div>



      {/* TIMESHEET TABLE FORMAT (FULL 7-DAY WORK LOG TABLE AS EARLIER) */}
      <div className="bg-white border border-[#E6E0F0] rounded-2xl shadow-sm overflow-hidden">
        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6E0F0] bg-[#F7F2FB]/60 text-[11px] font-bold text-[#A79CBC] uppercase tracking-wider font-sora">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4 w-32">DATE</th>
                <th className="py-3.5 px-4 w-48">PROJECT</th>
                <th className="py-3.5 px-4 w-32">HOURS</th>
                <th className="py-3.5 px-4">ACTIVITY / TASK DETAILS</th>
                <th className="py-3.5 px-4 w-28 text-center">ACTIONS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E6E0F0]">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-[#F5F3FA]/50 transition-colors">
                  {/* # Index Column */}
                  <td className="py-3 px-4 text-xs font-bold text-[#6E637F] text-center">{row.dayIndex}</td>

                  {/* Date Column with Circular Badge */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EFE6F5] text-[#5B3778] flex items-center justify-center font-bold text-xs font-sora shrink-0 border border-[#5B3778]/20">
                        {row.dateNum}
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-bold text-[#241B35] font-sora">{row.dayName}</div>
                        <div className="text-[10px] text-[#A79CBC] font-medium">{row.month}</div>
                      </div>
                    </div>
                  </td>

                  {/* Project Selector Dropdown Pill */}
                  <td className="py-3 px-4">
                    <select
                      value={row.project}
                      onChange={(e) => handleRowChange(row.id, "project", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-[#E6E0F0] rounded-xl text-xs font-semibold text-[#241B35] focus:outline-none focus:border-[#5B3778] focus:ring-2 focus:ring-[#EFE6F5]"
                    >
                      <option value="Select Project">Select Project</option>
                      <option value="Dayflow">Dayflow</option>
                      <option value="CampusConnect">CampusConnect</option>
                      <option value="Smart Parking">Smart Parking</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>

                  {/* Hours Badge / Duration Input Pill */}
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={WorkLogService.formatMinutes(row.hoursMinutes)}
                      onChange={(e) => {
                        const val = e.target.value;
                        const parsedMins = parseInt(val) || 0;
                        handleRowChange(row.id, "hoursMinutes", parsedMins > 0 ? parsedMins * 60 : 0);
                      }}
                      className="w-20 px-2.5 py-1.5 bg-[#F5F3FA] border border-[#E6E0F0] rounded-xl text-xs font-bold text-[#5B3778] font-mono text-center focus:outline-none focus:border-[#5B3778]"
                    />
                  </td>

                  {/* Activity / Task Details Input */}
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={row.activity}
                      onChange={(e) => handleRowChange(row.id, "activity", e.target.value)}
                      placeholder="What did you work on?"
                      className="w-full px-3.5 py-2 bg-white border border-[#E6E0F0] rounded-xl text-xs font-medium text-[#241B35] placeholder-[#A79CBC] focus:outline-none focus:border-[#5B3778] focus:ring-2 focus:ring-[#EFE6F5]"
                    />
                  </td>

                  {/* Action Buttons (Save & Trash) */}
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleSaveRow(row.id)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          row.isSaved
                            ? "bg-[#E2F6F1] text-[#0FA98C] border-[#0FA98C]/30"
                            : "bg-white text-[#0FA98C] border-[#E6E0F0] hover:bg-[#E2F6F1]"
                        }`}
                        title="Save Row"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleClearRow(row.id)}
                        className="p-1.5 rounded-lg border border-[#E6E0F0] bg-white text-[#DD5471] hover:bg-[#FCE9ED] transition-all"
                        title="Clear Row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Footer Bar */}
        <div className="p-4 border-t border-[#E6E0F0] bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-medium text-[#6E637F]">
            Showing <span className="font-bold text-[#241B35]">1 to 7</span> of 7 days
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs font-semibold text-[#6E637F]">
              Total Hours: <span className="text-sm font-bold text-[#5B3778] font-mono ml-1">{WorkLogService.formatMinutes(totalLoggedMinutes)}</span>
            </div>
            <div className="text-xs text-[#0FA98C] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved automatically ({lastSaved})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

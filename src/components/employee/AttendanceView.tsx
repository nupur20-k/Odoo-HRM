"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertCircle,
  Play,
  Square,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AttendanceView() {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(13335); // 3h 42m 15s
  const [currentMonth, setCurrentMonth] = useState("AUGUST 2026");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCheckedIn) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCheckedIn]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Mock Calendar Days data for August 2026 (Aug 1 is Saturday)
  const calendarDays = [
    // Empty padding for Sun-Fri before Aug 1 (Sat)
    { day: null, dateStr: "", status: "empty" },
    { day: null, dateStr: "", status: "empty" },
    { day: null, dateStr: "", status: "empty" },
    { day: null, dateStr: "", status: "empty" },
    { day: null, dateStr: "", status: "empty" },
    { day: null, dateStr: "", status: "empty" },
    { day: 1, dateStr: "Aug 1", status: "weekend", label: "Weekend / Holiday" },

    { day: 2, dateStr: "Aug 2", status: "weekend", label: "Weekend / Holiday" },
    { day: 3, dateStr: "Aug 3", status: "present", label: "Present • 09:01 AM" },
    { day: 4, dateStr: "Aug 4", status: "present", label: "Present • 09:05 AM" },
    { day: 5, dateStr: "Aug 5", status: "present", label: "Present • 08:58 AM" },
    { day: 6, dateStr: "Aug 6", status: "present", label: "Present • 09:10 AM" },
    { day: 7, dateStr: "Aug 7", status: "present", label: "Present • 09:02 AM" },
    { day: 8, dateStr: "Aug 8", status: "weekend", label: "Weekend / Holiday" },

    { day: 9, dateStr: "Aug 9", status: "weekend", label: "Weekend / Holiday" },
    { day: 10, dateStr: "Aug 10", status: "present", label: "Present • 09:04 AM" },
    { day: 11, dateStr: "Aug 11", status: "present", label: "Present • 08:55 AM" },
    { day: 12, dateStr: "Aug 12", status: "leave", label: "On Leave (Casual)" },
    { day: 13, dateStr: "Aug 13", status: "leave", label: "On Leave (Casual)" },
    { day: 14, dateStr: "Aug 14", status: "present", label: "Present • 09:12 AM" },
    { day: 15, dateStr: "Aug 15", status: "weekend", label: "Weekend / Holiday" },

    { day: 16, dateStr: "Aug 16", status: "weekend", label: "Weekend / Holiday" },
    { day: 17, dateStr: "Aug 17", status: "present", label: "Present • 09:00 AM" },
    { day: 18, dateStr: "Aug 18", status: "present", label: "Present • 09:04 AM" },
    { day: 19, dateStr: "Aug 19", status: "present", label: "Present • 09:00 AM" },
    { day: 20, dateStr: "Aug 20", status: "halfday", label: "Half-Day • 09:12 AM" },
    { day: 21, dateStr: "Aug 21", status: "present", label: "Present • 09:05 AM" },
    { day: 22, dateStr: "Aug 22", status: "present", label: "Present • 09:12 AM" },

    { day: 23, dateStr: "Aug 23", status: "weekend", label: "Weekend / Holiday" },
    { day: 24, dateStr: "Aug 24", status: "upcoming", label: "No punch logs" },
    { day: 25, dateStr: "Aug 25", status: "upcoming", label: "No punch logs" },
    { day: 26, dateStr: "Aug 26", status: "upcoming", label: "No punch logs" },
    { day: 27, dateStr: "Aug 27", status: "upcoming", label: "No punch logs" },
    { day: 28, dateStr: "Aug 28", status: "upcoming", label: "No punch logs" },
    { day: 29, dateStr: "Aug 29", status: "weekend", label: "Weekend / Holiday" },

    { day: 30, dateStr: "Aug 30", status: "weekend", label: "Weekend / Holiday" },
    { day: 31, dateStr: "Aug 31", status: "upcoming", label: "No punch logs" },
  ];

  return (
    <div className="space-y-6 font-sans text-[#241B35]">
      {/* Top Section — 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Hero Card — Digital Time Punch */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-gradient-to-br from-white via-[#F7F2FB] to-white border border-[#E6E0F0] shadow-sm flex flex-col justify-between relative overflow-hidden">
          {/* Top Pill & Timer Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#EFE6F5] text-[#5B3778] border border-[#5B3778]/20 font-sora inline-block">
                Digital Time Punch
              </span>
              <h2 className="text-2xl font-bold text-[#241B35] font-sora mt-3">
                {isCheckedIn ? "You're Clocked In" : "Ready to Clock In"}
              </h2>
              <p className="text-xs text-[#6E637F] mt-1">
                Ensure your location settings are allowed for verification.
              </p>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#6E637F] font-sora">
                Logged Today
              </div>
              <div className="text-3xl font-extrabold font-mono tracking-widest text-[#5B3778] mt-1">
                {formatTimer(elapsedSeconds)}
              </div>
            </div>
          </div>

          {/* Clock In / Out Toggle Button */}
          <div className="my-6">
            <Button
              variant={isCheckedIn ? "danger" : "primary"}
              size="lg"
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm shadow-md"
              leftIcon={isCheckedIn ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              onClick={() => {
                setIsCheckedIn(!isCheckedIn);
                if (!isCheckedIn) setElapsedSeconds(0);
              }}
            >
              {isCheckedIn ? "Clock Out Now" : "Clock In Now"}
            </Button>
          </div>

          {/* Bottom Divider & Geofencing Status */}
          <div className="pt-4 border-t border-[#E6E0F0] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#EFE6F5] flex items-center justify-center text-[#5B3778]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#6E637F] uppercase tracking-wider font-sora">
                  Geofencing Status
                </div>
                <div className="text-xs font-bold text-[#241B35] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0FA98C]"></span> Office Zone Calibrated
                </div>
              </div>
            </div>

            <div className="text-xs text-[#6E637F]">
              Shift: <span className="font-semibold text-[#241B35]">09:00 AM &ndash; 06:00 PM</span>
            </div>
          </div>
        </div>

        {/* Right Card — Monthly Compliance / Attendance Summary */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#EFE6F5] text-[#5B3778] font-sora inline-block">
              Monthly Compliance
            </span>
            <h3 className="text-lg font-bold text-[#241B35] font-sora mt-2">Attendance Summary</h3>
            <p className="text-xs text-[#6E637F] mt-0.5 font-medium">
              Review your status logs for the current calendar period.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 my-2">
            <div className="p-3.5 rounded-xl bg-[#F5F3FA] border border-[#E6E0F0]">
              <div className="text-[10px] font-bold text-[#6E637F] uppercase tracking-wider font-sora">Active Hours</div>
              <div className="text-xl font-extrabold text-[#241B35] font-mono mt-1">148.5h</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F5F3FA] border border-[#E6E0F0]">
              <div className="text-[10px] font-bold text-[#6E637F] uppercase tracking-wider font-sora">Overtime</div>
              <div className="text-xl font-extrabold text-[#0FA98C] font-mono mt-1">+4.5h</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F3FA] border border-[#E6E0F0] text-xs text-[#6E637F] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#5B3778] shrink-0" />
            <span>Maintain 8 hours average shift time to avoid late deductions.</span>
          </div>
        </div>
      </div>

      {/* 5 Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#6E637F] uppercase tracking-wider font-sora">Present Days</div>
            <div className="text-xl font-extrabold text-[#0FA98C] font-mono mt-1">18</div>
          </div>
          <span className="w-3 h-3 rounded-full bg-[#0FA98C]"></span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#6E637F] uppercase tracking-wider font-sora">Half-Days</div>
            <div className="text-xl font-extrabold text-[#E0982A] font-mono mt-1">1</div>
          </div>
          <span className="w-3 h-3 rounded-full bg-[#E0982A]"></span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#6E637F] uppercase tracking-wider font-sora">On Leaves</div>
            <div className="text-xl font-extrabold text-[#5B3778] font-mono mt-1">2</div>
          </div>
          <span className="w-3 h-3 rounded-full bg-[#5B3778]"></span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#6E637F] uppercase tracking-wider font-sora">Absents</div>
            <div className="text-xl font-extrabold text-[#DD5471] font-mono mt-1">0</div>
          </div>
          <span className="w-3 h-3 rounded-full bg-[#DD5471]"></span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <div className="text-[10px] font-bold text-[#6E637F] uppercase tracking-wider font-sora">Late Penalties</div>
            <div className="text-xl font-extrabold text-[#DD5471] font-mono mt-1">0</div>
          </div>
          <span className="w-3 h-3 rounded-full bg-[#DD5471]"></span>
        </div>
      </div>

      {/* Attendance Month-Grid Calendar (Screenshot 2) */}
      <div className="p-6 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-[#241B35] font-sora">Attendance Month-Grid</h3>
            <p className="text-xs text-[#6E637F] mt-0.5">Click arrows to navigate months and view status cards.</p>
          </div>

          <div className="flex items-center gap-2 bg-[#F5F3FA] border border-[#E6E0F0] rounded-xl px-3 py-1.5 self-start sm:self-auto">
            <button className="p-1 hover:bg-white rounded-lg text-[#6E637F] hover:text-[#241B35] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-[#241B35] font-sora px-3">{currentMonth}</span>
            <button className="p-1 hover:bg-white rounded-lg text-[#6E637F] hover:text-[#241B35] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 7-Column Calendar Grid */}
        <div className="grid grid-cols-7 gap-2.5">
          {/* Day Headers */}
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((dayName) => (
            <div key={dayName} className="text-center text-[11px] font-bold text-[#A79CBC] uppercase tracking-wider font-sora py-1">
              {dayName}
            </div>
          ))}

          {/* Calendar Day Cards */}
          {calendarDays.map((cell, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border min-h-[78px] flex flex-col justify-between transition-all ${
                cell.status === "empty"
                  ? "bg-transparent border-transparent"
                  : cell.status === "present"
                  ? "bg-white border-[#0FA98C]/30 hover:border-[#0FA98C]"
                  : cell.status === "halfday"
                  ? "bg-white border-[#E0982A]/30 hover:border-[#E0982A]"
                  : cell.status === "leave"
                  ? "bg-white border-[#5B3778]/30 hover:border-[#5B3778]"
                  : cell.status === "weekend"
                  ? "bg-[#F5F3FA]/60 border-[#E6E0F0]"
                  : "bg-white border-[#E6E0F0] hover:border-[#5B3778]"
              }`}
            >
              {cell.day && (
                <>
                  <div className="text-xs font-bold text-[#241B35] font-sora">{cell.day}</div>
                  <div
                    className={`text-[10px] font-medium leading-tight mt-1 ${
                      cell.status === "present"
                        ? "text-[#0FA98C] font-semibold"
                        : cell.status === "halfday"
                        ? "text-[#E0982A] font-semibold"
                        : cell.status === "leave"
                        ? "text-[#5B3778] font-semibold"
                        : "text-[#A79CBC]"
                    }`}
                  >
                    {cell.label}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Calendar Legend */}
        <div className="pt-4 border-t border-[#E6E0F0] flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-[#6E637F]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0FA98C]"></span> PRESENT
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E0982A]"></span> HALF-DAY
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A79CBC]"></span> WEEKEND / HOLIDAY
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B3778]"></span> ON LEAVE
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DD5471]"></span> ABSENT
          </span>
        </div>
      </div>
    </div>
  );
}

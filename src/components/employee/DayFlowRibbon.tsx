"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface DayFlowRibbonProps {
  mini?: boolean;
}

export function DayFlowRibbon({ mini = false }: DayFlowRibbonProps) {
  const segments = [
    { label: "Focus Work", duration: "3.5h", color: "bg-[#5B3778]", flex: 5 },
    { label: "Team Sync", duration: "1.0h", color: "bg-[#0FA98C]", flex: 2 },
    { label: "Deep Focus", duration: "2.0h", color: "bg-[#5B3778]", flex: 3 },
    { label: "Lunch Break", duration: "1.0h", color: "bg-[#E0982A]", flex: 1 },
    { label: "Wrap-up", duration: "2.5h", color: "bg-[#5B3778]", flex: 4 },
  ];

  if (mini) {
    return (
      <div className="flex items-center gap-0.5 w-[140px] h-2.5 rounded-full overflow-hidden bg-[#F5F3FA] p-0.5 border border-[#E6E0F0]" title="Today's Work Ribbon">
        {segments.map((seg, idx) => (
          <div
            key={idx}
            className={cn("h-full rounded-sm transition-all", seg.color)}
            style={{ flex: seg.flex }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 rounded-[14px] bg-white border border-[#E6E0F0] shadow-sm space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">
            Today&apos;s Pattern — Engineering
          </span>
          <h3 className="text-base font-bold text-[#241B35] mt-0.5 font-sora">Your Day Flow</h3>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-[#6E637F] font-medium">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#5B3778]" /> Focus Work
          </span>
          <span className="flex items-center gap-1.5 text-[#6E637F] font-medium">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#0FA98C]" /> Meetings
          </span>
          <span className="flex items-center gap-1.5 text-[#6E637F] font-medium">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#E0982A]" /> Break
          </span>
        </div>
      </div>

      {/* Ribbon Bar */}
      <div className="flex items-center gap-1 h-6 w-full rounded-full bg-[#F5F3FA] p-1 border border-[#E6E0F0]">
        {segments.map((seg, idx) => (
          <div
            key={idx}
            className={cn("h-full rounded-full transition-all relative group flex items-center justify-center text-[10px] font-bold text-white shadow-sm", seg.color)}
            style={{ flex: seg.flex }}
          >
            <span className="truncate px-1 hidden sm:inline font-sora">{seg.label}</span>
          </div>
        ))}
      </div>

      {/* Time Axis */}
      <div className="flex justify-between text-[11px] font-mono text-[#A79CBC] px-1 pt-1 border-t border-[#E6E0F0]">
        <span>09:00</span>
        <span>12:00</span>
        <span>15:00</span>
        <span>18:00</span>
      </div>
    </div>
  );
}

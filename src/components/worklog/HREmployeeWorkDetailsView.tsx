"use client";

import React, { useState } from "react";
import { ArrowLeft, Sparkles, Calendar, Clock, CheckCircle2, RefreshCw } from "lucide-react";
import { WorkLogService } from "@/services/worklog.service";
import { useRouter } from "next/navigation";

interface HREmployeeWorkDetailsViewProps {
  employeeId?: string;
  onBack?: () => void;
}

export function HREmployeeWorkDetailsView({ employeeId = "emp-105", onBack }: HREmployeeWorkDetailsViewProps) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const employeeMap: { [id: string]: { name: string; role: string; dept: string } } = {
    "emp-101": { name: "Priya Shah", role: "Senior Product Designer", dept: "Design Team" },
    "emp-102": { name: "Rahul Sharma", role: "Backend Engineer", dept: "Engineering" },
    "emp-103": { name: "Priya Patil", role: "UI/UX Designer", dept: "Design" },
    "emp-104": { name: "Amit Joshi", role: "Fullstack Developer", dept: "Engineering" },
    "emp-105": { name: "Nupur Kulkarni", role: "Frontend Developer", dept: "Engineering" },
  };

  const empInfo = employeeMap[employeeId] || { name: "Nupur Kulkarni", role: "Frontend Developer", dept: "Engineering" };
  const [aiSummary, setAiSummary] = useState(WorkLogService.generateAISummary(empInfo.name));

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiSummary(WorkLogService.generateAISummary(empInfo.name));
      setIsGenerating(false);
    }, 800);
  };

  const handleBack = () => {
    if (onBack) onBack();
    else router.push("/admin/work-overview");
  };

  return (
    <div className="space-y-6 font-sans text-[#241B35]">
      {/* Top Header & Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 rounded-xl bg-white border border-[#E6E0F0] text-[#6E637F] hover:text-[#241B35] hover:bg-[#F5F3FA] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <div className="text-xs font-semibold text-[#5B3778] uppercase tracking-wider font-sora">
            HR Work Details
          </div>
          <h1 className="text-2xl font-bold text-[#241B35] font-sora mt-0.5">{empInfo.name}</h1>
        </div>
      </div>

      {/* Employee Info Header Card */}
      <div className="p-5 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EFE6F5] text-[#5B3778] flex items-center justify-center font-bold text-xl font-sora shrink-0">
            {empInfo.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#241B35] font-sora">{empInfo.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#E2F6F1] text-[#0FA98C] font-bold">
                🟢 Active
              </span>
            </div>
            <p className="text-xs text-[#6E637F] mt-0.5 font-medium">
              {empInfo.role} &bull; {empInfo.dept} &bull; <span className="font-mono text-[#5B3778] font-bold">DF-2291</span>
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Summary Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-white via-[#F7F2FB] to-white border border-[#E6E0F0] shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-[#6E637F] uppercase tracking-wider font-sora">Weekly Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-white border border-[#E6E0F0]">
            <div className="text-[11px] font-semibold text-[#6E637F] uppercase tracking-wider font-sora">Working Hours</div>
            <div className="text-lg font-bold text-[#241B35] font-mono mt-1">38h 20m</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#E6E0F0]">
            <div className="text-[11px] font-semibold text-[#6E637F] uppercase tracking-wider font-sora">Logged Work</div>
            <div className="text-lg font-bold text-[#5B3778] font-mono mt-1">35h 10m</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#E6E0F0]">
            <div className="text-[11px] font-semibold text-[#6E637F] uppercase tracking-wider font-sora">Attendance</div>
            <div className="text-lg font-bold text-[#0FA98C] font-mono mt-1">96%</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#E6E0F0]">
            <div className="text-[11px] font-semibold text-[#6E637F] uppercase tracking-wider font-sora">Projects</div>
            <div className="text-lg font-bold text-[#241B35] font-mono mt-1">3</div>
          </div>
        </div>
      </div>

      {/* Time by Project Breakdown & AI Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Time by Project Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#241B35] font-sora">Time by Project</h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#241B35] mb-1">
                <span>Dayflow</span>
                <span className="font-mono text-[#5B3778]">21h (60%)</span>
              </div>
              <div className="w-full h-2.5 bg-[#F5F3FA] rounded-full overflow-hidden">
                <div className="h-full bg-[#5B3778] rounded-full" style={{ width: "60%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#241B35] mb-1">
                <span>CampusConnect</span>
                <span className="font-mono text-[#0FA98C]">10h (28%)</span>
              </div>
              <div className="w-full h-2.5 bg-[#F5F3FA] rounded-full overflow-hidden">
                <div className="h-full bg-[#0FA98C] rounded-full" style={{ width: "28%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#241B35] mb-1">
                <span>Other</span>
                <span className="font-mono text-[#E0982A]">7h (12%)</span>
              </div>
              <div className="w-full h-2.5 bg-[#F5F3FA] rounded-full overflow-hidden">
                <div className="h-full bg-[#E0982A] rounded-full" style={{ width: "12%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* AI Smart Summary Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#EFE6F5]/50 via-white to-white border border-[#5B3778]/30 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5B3778]" />
              <h3 className="text-sm font-bold text-[#5B3778] font-sora">✨ Weekly Work Summary</h3>
            </div>
            <p className="text-xs text-[#241B35] leading-relaxed font-medium bg-white/80 p-3.5 rounded-xl border border-[#E6E0F0]">
              "{aiSummary}"
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="text-xs px-3.5 py-2 rounded-xl font-semibold bg-[#5B3778] text-white hover:bg-[#452A5D] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
              {isGenerating ? "Generating..." : "Generate Summary"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

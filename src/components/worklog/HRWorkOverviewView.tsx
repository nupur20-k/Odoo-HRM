"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users, CheckCircle2, AlertTriangle, AlertCircle, Bell, Eye, Search, Filter } from "lucide-react";
import { WorkLogService } from "@/services/worklog.service";
import { EmployeeWorkOverview } from "@/types/worklog";

interface HRWorkOverviewViewProps {
  onSelectEmployee?: (id: string) => void;
}

export function HRWorkOverviewView({ onSelectEmployee }: HRWorkOverviewViewProps) {
  const router = useRouter();
  const [employees, setEmployees] = useState<EmployeeWorkOverview[]>(WorkLogService.getHRWorkOverview());
  const [remindedIds, setRemindedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "complete" | "incomplete" | "missing">("all");

  const handleRemind = (id: string, name: string) => {
    setRemindedIds((prev) => [...prev, id]);
  };

  const handleView = (id: string) => {
    if (onSelectEmployee) {
      onSelectEmployee(id);
    } else {
      router.push(`/admin/work-overview/${id}`);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || emp.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const completeCount = employees.filter((e) => e.status === "complete").length;
  const incompleteCount = employees.filter((e) => e.status === "incomplete").length;
  const missingCount = employees.filter((e) => e.status === "missing").length;

  return (
    <div className="space-y-6 font-sans text-[#241B35]">
      {/* Page Header */}
      <div>
        <div className="text-xs font-semibold text-[#5B3778] uppercase tracking-wider font-sora">
          HR Management Console
        </div>
        <h1 className="text-2xl font-bold text-[#241B35] font-sora mt-0.5">Work Overview</h1>
        <p className="text-xs text-[#6E637F] mt-0.5">See employee work activity and completion at a glance.</p>
      </div>

      {/* Top Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFE6F5] text-[#5B3778] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-[#6E637F]">Total Employees</div>
            <div className="text-xl font-bold text-[#241B35] font-mono">128</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E2F6F1] text-[#0FA98C] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-[#6E637F]">Work Logs Complete</div>
            <div className="text-xl font-bold text-[#0FA98C] font-mono">104</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FBF0DD] text-[#E0982A] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-[#6E637F]">Need Attention</div>
            <div className="text-xl font-bold text-[#E0982A] font-mono">18</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FCE9ED] text-[#DD5471] flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-[#6E637F]">Missing Logs</div>
            <div className="text-xl font-bold text-[#DD5471] font-mono">6</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-white border border-[#E6E0F0] rounded-xl px-3.5 py-2 w-full sm:w-[300px]">
          <Search className="w-4 h-4 text-[#A79CBC]" />
          <input
            type="text"
            placeholder="Search employee name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-[#241B35] placeholder-[#A79CBC] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 bg-white border border-[#E6E0F0] rounded-xl p-1">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              filterStatus === "all" ? "bg-[#5B3778] text-white" : "text-[#6E637F] hover:text-[#241B35]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("complete")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              filterStatus === "complete" ? "bg-[#0FA98C] text-white" : "text-[#6E637F] hover:text-[#241B35]"
            }`}
          >
            Complete
          </button>
          <button
            onClick={() => setFilterStatus("incomplete")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              filterStatus === "incomplete" ? "bg-[#E0982A] text-white" : "text-[#6E637F] hover:text-[#241B35]"
            }`}
          >
            Incomplete
          </button>
          <button
            onClick={() => setFilterStatus("missing")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              filterStatus === "missing" ? "bg-[#DD5471] text-white" : "text-[#6E637F] hover:text-[#241B35]"
            }`}
          >
            Missing
          </button>
        </div>
      </div>

      {/* Employee Attention Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#241B35] font-sora">Employee Activity Status</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => {
            const isReminded = remindedIds.includes(emp.id);

            return (
              <div
                key={emp.id}
                className="p-4 rounded-2xl bg-white border border-[#E6E0F0] shadow-sm hover:border-[#5B3778]/30 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
                      alt={emp.name}
                      className="w-10 h-10 rounded-xl object-cover border border-[#E6E0F0]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#241B35] font-sora">{emp.name}</h4>
                      <p className="text-[11px] text-[#6E637F]">{emp.role}</p>
                    </div>
                  </div>

                  {emp.status === "complete" && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#E2F6F1] text-[#0FA98C] font-bold">
                      🟢 Complete
                    </span>
                  )}
                  {emp.status === "incomplete" && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#FBF0DD] text-[#E0982A] font-bold">
                      ⚠️ Incomplete
                    </span>
                  )}
                  {emp.status === "missing" && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#FCE9ED] text-[#DD5471] font-bold">
                      ⚠️ Missing
                    </span>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-[#F7F2FB] text-xs space-y-1">
                  {emp.status === "missing" ? (
                    <p className="text-[#DD5471] font-medium">No work entry recorded today.</p>
                  ) : (
                    <div className="flex items-center justify-between text-[#6E637F]">
                      <span>Logged: <strong className="text-[#241B35] font-mono">{WorkLogService.formatMinutes(emp.loggedMinutes)}</strong></span>
                      <span>Expected: <strong className="text-[#241B35] font-mono">{WorkLogService.formatMinutes(emp.expectedMinutes)}</strong></span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#E6E0F0]">
                  {emp.status === "missing" ? (
                    <button
                      onClick={() => handleRemind(emp.id, emp.name)}
                      disabled={isReminded}
                      className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                        isReminded
                          ? "bg-[#E2F6F1] text-[#0FA98C] cursor-default"
                          : "bg-[#DD5471] text-white hover:bg-[#c4435f]"
                      }`}
                    >
                      <Bell className="w-3.5 h-3.5" />
                      {isReminded ? "Reminded" : "Remind"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleView(emp.id)}
                      className="text-xs px-3 py-1.5 rounded-xl font-semibold border border-[#5B3778] text-[#5B3778] hover:bg-[#EFE6F5] transition-all flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

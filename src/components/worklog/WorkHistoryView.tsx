"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Filter, Calendar, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WorkLogService } from "@/services/worklog.service";
import { WorkEntry } from "@/types/worklog";

export function WorkHistoryView() {
  const [entries, setEntries] = useState<WorkEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setEntries(WorkLogService.getEntries());
  }, []);

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = selectedProject === "All" || entry.project === selectedProject;
    return matchesSearch && matchesProject;
  });

  // Group entries by date
  const groupedEntries: { [date: string]: WorkEntry[] } = {};
  filteredEntries.forEach((entry) => {
    if (!groupedEntries[entry.date]) {
      groupedEntries[entry.date] = [];
    }
    groupedEntries[entry.date].push(entry);
  });

  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric" };
    return d.toLocaleDateString("en-US", options);
  };

  const totalLoggedMinutes = filteredEntries.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  const handleSubmitWeek = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6 font-sans text-[#241B35]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#5B3778] uppercase tracking-wider font-sora">
            Work Log History
          </div>
          <h1 className="text-2xl font-bold text-[#241B35] font-sora mt-0.5">My Work History</h1>
          <p className="text-xs text-[#6E637F] mt-0.5">Review your previous work entries and weekly activity.</p>
        </div>

        {/* Week Selector & Submit Week Button */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-[#E6E0F0] shadow-sm">
            <button className="p-1.5 rounded-xl hover:bg-[#F5F3FA] text-[#6E637F] hover:text-[#241B35]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-[#241B35] font-sora px-2">Aug 17 – Aug 23, 2026</span>
            <button className="p-1.5 rounded-xl hover:bg-[#F5F3FA] text-[#6E637F] hover:text-[#241B35]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Send className="w-3.5 h-3.5" />}
            onClick={handleSubmitWeek}
          >
            Submit Week
          </Button>
        </div>
      </div>

      {/* Submission Success Alert */}
      {isSubmitted && (
        <div className="p-3 bg-[#E2F6F1] border border-[#0FA98C]/30 text-[#0FA98C] text-xs font-bold rounded-2xl flex items-center justify-between px-6 animate-in fade-in shadow-sm">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Weekly Timesheet (Aug 17 – Aug 23) successfully submitted for HR approval!
          </span>
          <span className="text-[10px] uppercase font-mono bg-white px-2.5 py-0.5 rounded-full border border-[#0FA98C]/20">
            Pending HR Review
          </span>
        </div>
      )}

      {/* Weekly Summary Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-white via-[#F7F2FB] to-white border border-[#E6E0F0] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#5B3778]" />
            <h3 className="text-xs font-bold text-[#241B35] uppercase tracking-wider font-sora">
              Weekly Overview (Aug 17 – Aug 23)
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E2F6F1] text-[#0FA98C]">
            92% Completed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-white border border-[#E6E0F0]">
            <div className="text-[11px] font-semibold text-[#6E637F] uppercase tracking-wider font-sora">Total Working Time</div>
            <div className="text-lg font-bold text-[#241B35] font-mono mt-1">38h 20m</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#E6E0F0]">
            <div className="text-[11px] font-semibold text-[#6E637F] uppercase tracking-wider font-sora">Logged Work</div>
            <div className="text-lg font-bold text-[#5B3778] font-mono mt-1">{WorkLogService.formatMinutes(totalLoggedMinutes)}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#E6E0F0]">
            <div className="text-[11px] font-semibold text-[#6E637F] uppercase tracking-wider font-sora">Active Projects</div>
            <div className="text-lg font-bold text-[#241B35] font-mono mt-1">3</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#E6E0F0]">
            <div className="text-[11px] font-semibold text-[#6E637F] uppercase tracking-wider font-sora">Work Log Status</div>
            <div className="text-lg font-bold text-[#0FA98C] font-sora mt-1">On Track</div>
          </div>
        </div>
      </div>

      {/* Search & Project Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-white border border-[#E6E0F0] rounded-xl px-3.5 py-2 w-full sm:w-[280px]">
          <Search className="w-4 h-4 text-[#A79CBC]" />
          <input
            type="text"
            placeholder="Search tasks, projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-[#241B35] placeholder-[#A79CBC] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-[#6E637F]" />
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3.5 py-2 bg-white border border-[#E6E0F0] rounded-xl text-xs font-medium text-[#241B35] focus:outline-none focus:border-[#5B3778]"
          >
            <option value="All">All Projects</option>
            <option value="Dayflow">Dayflow</option>
            <option value="CampusConnect">CampusConnect</option>
            <option value="Smart Parking">Smart Parking</option>
          </select>
        </div>
      </div>

      {/* Grouped Work Entries List */}
      <div className="space-y-6">
        {Object.keys(groupedEntries).length === 0 ? (
          <div className="p-8 text-center bg-white border border-[#E6E0F0] rounded-2xl text-xs text-[#6E637F]">
            No work log entries found matching criteria.
          </div>
        ) : (
          Object.keys(groupedEntries).map((date) => (
            <div key={date} className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E6E0F0] pb-2">
                <span className="text-xs font-bold text-[#5B3778] uppercase tracking-wider font-sora">
                  {formatDateLabel(date)}
                </span>
                <span className="text-xs font-bold text-[#6E637F] font-mono">
                  {WorkLogService.formatMinutes(
                    groupedEntries[date].reduce((acc, curr) => acc + curr.durationMinutes, 0)
                  )}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {groupedEntries[date].map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 rounded-xl bg-white border border-[#E6E0F0] shadow-sm hover:border-[#5B3778]/40 transition-all flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFE6F5] text-[#5B3778]">
                          {entry.project}
                        </span>
                        <h4 className="text-xs font-bold text-[#241B35] font-sora">{entry.task}</h4>
                      </div>
                      <p className="text-xs text-[#6E637F]">{entry.activity}</p>
                    </div>

                    <span className="text-xs font-bold text-[#5B3778] font-mono bg-[#F7F2FB] px-2.5 py-1 rounded-lg shrink-0">
                      {WorkLogService.formatMinutes(entry.durationMinutes)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

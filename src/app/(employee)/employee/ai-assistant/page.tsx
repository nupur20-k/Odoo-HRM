"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Send,
  Bell,
  Check,
  X,
  Users,
  Calendar,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AiLeaveAssistantPage() {
  const [selectedType, setSelectedType] = useState<"Paid Leave" | "Sick Leave" | "Unpaid Leave">("Paid Leave");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hrStatus, setHrStatus] = useState<"Pending" | "Approved" | "Rejected">("Pending");

  const handleSubmitRequest = () => {
    setIsSubmitted(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Head */}
        <div>
          <span className="text-xs font-semibold uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Leave, Without the Back-and-Forth
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">AI Leave Assistant</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Ask in plain language. Dayflow checks your balance, working days, and team overlap before you submit.
          </p>
        </div>

        {/* Dual Column Flagship Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ============ LEFT: EMPLOYEE CHAT CARD (7 cols) ============ */}
          <div className="lg:col-span-7 flex flex-col rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  Dayflow Assistant
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                    Flagship AI
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Reads your leave balance & team calendar
                </p>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-5 space-y-4 max-h-[550px] overflow-y-auto bg-slate-950/30">
              {/* User Bubble */}
              <div className="flex items-start justify-end gap-2.5">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3.5 rounded-2xl rounded-tr-none text-xs shadow-md max-w-sm">
                  I want leave tomorrow.
                </div>
                <div className="w-7 h-7 rounded-full bg-indigo-900 text-indigo-200 font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-700">
                  NI
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-purple-900/80 text-purple-300 flex items-center justify-center shrink-0 border border-purple-700">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-3 max-w-md w-full">
                  <div className="bg-slate-900 text-slate-200 p-3.5 rounded-2xl rounded-tl-none text-xs border border-slate-800 shadow-sm">
                    Sure — here&apos;s what I found for tomorrow, <strong className="text-white">Fri 21 Aug</strong>:
                  </div>

                  {/* Insight Card */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Leave Balance</span>
                        <span className="text-emerald-300 font-semibold">4 paid leaves remaining this quarter</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Calendar Check</span>
                        <span className="text-emerald-300 font-semibold">Tomorrow is a working day, no holiday</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Team Availability</span>
                        <span className="text-amber-300 font-semibold">2 of 8 teammates already on leave</span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-white pt-1">
                      Would you like to submit this as Paid Leave?
                    </p>

                    {/* Chips */}
                    <div className="flex items-center gap-2">
                      {(["Paid Leave", "Sick Leave", "Unpaid Leave"] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border",
                            selectedType === type
                              ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/20"
                              : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="primary"
                      className="w-full mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25"
                      leftIcon={<Send className="w-4 h-4" />}
                      onClick={handleSubmitRequest}
                      disabled={isSubmitted}
                    >
                      {isSubmitted ? "Request Submitted" : "Submit Leave Request"}
                    </Button>
                  </div>

                  {/* Confirmation Bubble */}
                  {isSubmitted && (
                    <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in zoom-in-95">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Sent to Rakesh Menon for approval. You&apos;ll be notified once reviewed.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chat Footer Input */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about leave, balance, or team availability..."
                className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500"
              />
              <button className="p-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-colors shadow-md">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ============ RIGHT: WHAT HR SEES COLUMN (5 cols) ============ */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-indigo-400" /> What HR Sees
            </div>

            {/* Notification Card */}
            <Card className="border-indigo-500/30 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <div className="p-1 rounded-md bg-purple-500/20 text-purple-400">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  New Leave Request
                </div>
                <span className="text-[11px] text-slate-400">Just now</span>
              </div>

              <div className="py-3 flex items-center gap-3 border-b border-slate-800/60">
                <div className="w-10 h-10 rounded-full bg-indigo-900 text-indigo-200 font-bold text-sm flex items-center justify-center border border-indigo-700">
                  NI
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Nupur Iyer</h4>
                  <p className="text-xs text-slate-400">Product Lead &bull; DF-2310</p>
                </div>
              </div>

              {/* 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3 py-3 border-b border-slate-800/60 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase block">Type</span>
                  <Badge variant="warning">{selectedType}</Badge>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase block">Duration</span>
                  <span className="font-semibold text-white">1 day &bull; Fri, 21 Aug</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase block">Balance After</span>
                  <span className="font-semibold text-white">3 days remaining</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase block">Requested Via</span>
                  <span className="font-semibold text-purple-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Assistant
                  </span>
                </div>
              </div>

              {/* Amber Warning Banner */}
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs my-3 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  Team Availability Warning
                </p>
                <p className="text-[11px] text-amber-200">
                  2 teammates are already on leave that day — approving brings the team to 3 of 8 out.
                </p>
              </div>

              {/* Actions */}
              {hrStatus === "Pending" ? (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/20"
                    leftIcon={<Check className="w-4 h-4" />}
                    onClick={() => setHrStatus("Approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-rose-500/50 text-rose-400 hover:bg-rose-500/10"
                    leftIcon={<X className="w-4 h-4" />}
                    onClick={() => setHrStatus("Rejected")}
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-slate-950 text-center text-xs font-semibold border border-slate-800">
                  Status:{" "}
                  <span className={hrStatus === "Approved" ? "text-emerald-400" : "text-rose-400"}>
                    {hrStatus}
                  </span>
                </div>
              )}
            </Card>

            {/* Team Availability Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xs flex items-center justify-between">
                  <span>Team availability &bull; Fri 21 Aug</span>
                  <span className="text-emerald-400 font-bold">6/8 available</span>
                </CardTitle>
              </CardHeader>
              <CardBody className="space-y-3">
                {/* Segmented Bar */}
                <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
                  <div className="h-full bg-emerald-500 w-[75%]" />
                  <div className="h-full bg-rose-500 w-[25%]" />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Anjali Nair
                    </span>
                    <span className="text-slate-400 text-[11px]">On leave</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Kabir Joshi
                    </span>
                    <span className="text-slate-400 text-[11px]">On leave</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> Nupur Iyer
                    </span>
                    <span className="text-amber-400 text-[11px] font-medium">
                      Pending ({isSubmitted ? "Submitted" : "Draft"})
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> 5 others
                    </span>
                    <span className="text-emerald-400 text-[11px]">Available</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

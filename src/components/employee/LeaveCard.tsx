"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CalendarDays, Plus, Info } from "lucide-react";
import { LeaveBalance } from "@/types/leave";

export interface LeaveCardProps {
  balance: LeaveBalance;
  onRequestClick: () => void;
}

export function LeaveCard({ balance, onRequestClick }: LeaveCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-indigo-400" /> Leave Balance
          </span>
          <Button variant="outline" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />} onClick={onRequestClick}>
            Apply Leave
          </Button>
        </CardTitle>
      </CardHeader>

      <CardBody>
        <div className="grid grid-cols-3 gap-3">
          {/* Casual Leave */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Casual</span>
              <div className="text-2xl font-bold text-white mt-1">
                {balance.casual.total - balance.casual.used}{" "}
                <span className="text-xs font-normal text-slate-500">/ {balance.casual.total}</span>
              </div>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all"
                style={{ width: `${(balance.casual.used / balance.casual.total) * 100}%` }}
              />
            </div>
          </div>

          {/* Sick Leave */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Sick</span>
              <div className="text-2xl font-bold text-white mt-1">
                {balance.sick.total - balance.sick.used}{" "}
                <span className="text-xs font-normal text-slate-500">/ {balance.sick.total}</span>
              </div>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{ width: `${(balance.sick.used / balance.sick.total) * 100}%` }}
              />
            </div>
          </div>

          {/* Earned Leave */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Earned</span>
              <div className="text-2xl font-bold text-white mt-1">
                {balance.earned.total - balance.earned.used}{" "}
                <span className="text-xs font-normal text-slate-500">/ {balance.earned.total}</span>
              </div>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full transition-all"
                style={{ width: `${(balance.earned.used / balance.earned.total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-4 flex items-center gap-1">
          <Info className="w-3 h-3 text-blue-400" /> Balances auto-reset on Jan 1st every fiscal year.
        </p>
      </CardBody>
    </Card>
  );
}

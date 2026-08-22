"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Clock, Play, Square, CheckCircle2, History } from "lucide-react";
import { AttendanceService } from "@/services/attendance.service";
import { formatSecondsToHHMMSS } from "@/lib/utils";

export interface AttendanceCardProps {
  employeeId: string;
  employeeName: string;
}

export function AttendanceCard({ employeeId, employeeName }: AttendanceCardProps) {
  const [clockState, setClockState] = useState({
    isClockedIn: false,
    checkInTime: "",
    elapsedSeconds: 0,
  });

  useEffect(() => {
    const saved = AttendanceService.getClockState(employeeId);
    setClockState({
      isClockedIn: saved.isClockedIn,
      checkInTime: saved.checkInTime || "",
      elapsedSeconds: saved.elapsedSeconds || 0,
    });
  }, [employeeId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (clockState.isClockedIn) {
      timer = setInterval(() => {
        setClockState((prev) => {
          const next = { ...prev, elapsedSeconds: prev.elapsedSeconds + 1 };
          AttendanceService.saveClockState(employeeId, next);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [clockState.isClockedIn, employeeId]);

  const handleClockToggle = () => {
    if (clockState.isClockedIn) {
      AttendanceService.clockOut(employeeId);
      setClockState({
        isClockedIn: false,
        checkInTime: "",
        elapsedSeconds: 0,
      });
    } else {
      const record = AttendanceService.clockIn(employeeId, employeeName);
      setClockState({
        isClockedIn: true,
        checkInTime: record.checkIn,
        elapsedSeconds: 1,
      });
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
      <CardHeader>
        <CardTitle>
          <span className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" /> Attendance Action
          </span>
          <span className="text-xs font-normal text-slate-400">Today, {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </CardTitle>
      </CardHeader>

      <CardBody className="flex flex-col items-center justify-center py-4">
        {/* Live Timer Display */}
        <div className="text-center my-2">
          <div className="text-4xl font-extrabold tracking-widest text-white font-mono drop-shadow-md">
            {formatSecondsToHHMMSS(clockState.elapsedSeconds)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {clockState.isClockedIn ? (
              <span className="text-emerald-400 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Clocked in at {clockState.checkInTime}
              </span>
            ) : (
              "You are currently clocked out"
            )}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6 w-full max-w-xs">
          <Button
            variant={clockState.isClockedIn ? "danger" : "primary"}
            size="lg"
            className="w-full shadow-lg"
            leftIcon={clockState.isClockedIn ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            onClick={handleClockToggle}
          >
            {clockState.isClockedIn ? "Clock Out Now" : "Clock In Now"}
          </Button>
        </div>

        {/* Quick Shift Target */}
        <div className="mt-6 flex items-center justify-between w-full text-xs text-slate-400 pt-4 border-t border-slate-800/80">
          <span className="flex items-center gap-1">
            <History className="w-3.5 h-3.5 text-slate-500" /> Standard Shift: 9:00 AM - 5:00 PM
          </span>
          <span className="font-semibold text-slate-300">Target: 8.0 hrs</span>
        </div>
      </CardBody>
    </Card>
  );
}

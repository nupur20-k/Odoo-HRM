"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Table as TableRoot, TableHeader as THead, TableBody as TBody, TableRow as TRow, TableHead as TH, TableCell as TD } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Clock } from "lucide-react";

export default function EmployeeAttendancePage() {
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  const weeklyLogs = [
    { day: "Mon 18 Aug", checkIn: "09:02 AM", checkOut: "06:15 PM", hours: "09h 13m", status: "Present", pill: "success" },
    { day: "Tue 19 Aug", checkIn: "09:15 AM", checkOut: "06:30 PM", hours: "09h 15m", status: "Present", pill: "success" },
    { day: "Wed 20 Aug", checkIn: "09:12 AM", checkOut: "Active", hours: "06h 42m", status: "Present", pill: "success" },
    { day: "Thu 21 Aug", checkIn: "--:--", checkOut: "--:--", hours: "00h 00m", status: "Upcoming", pill: "neutral" },
    { day: "Fri 22 Aug", checkIn: "--:--", checkOut: "--:--", hours: "00h 00m", status: "Upcoming", pill: "neutral" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 font-sans">
        {/* Page Head */}
        <div>
          <div className="text-xs font-semibold text-[#6E637F] uppercase tracking-wider font-sora">
            This Week
          </div>
          <h1 className="text-2xl font-bold text-[#241B35] font-sora mt-0.5">Attendance</h1>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Wider Card: Weekly Overview */}
          <div className="lg:col-span-8 space-y-4">
            <TableRoot>
              <THead>
                <TRow>
                  <TH>Day</TH>
                  <TH>Check In</TH>
                  <TH>Check Out</TH>
                  <TH>Hours</TH>
                  <TH>Status</TH>
                </TRow>
              </THead>
              <TBody>
                {weeklyLogs.map((log) => (
                  <TRow key={log.day}>
                    <TD className="font-semibold text-[#241B35] font-sora">{log.day}</TD>
                    <TD className="font-mono text-[#5B3778]">{log.checkIn}</TD>
                    <TD className="font-mono text-[#6E637F]">{log.checkOut}</TD>
                    <TD className="font-mono text-[#241B35]">{log.hours}</TD>
                    <TD>
                      <Badge variant={log.pill as any}>{log.status}</Badge>
                    </TD>
                  </TRow>
                ))}
              </TBody>
            </TableRoot>
          </div>

          {/* Right Card: Check-in Box */}
          <div className="lg:col-span-4">
            <Card className="text-center py-8 px-6 flex flex-col items-center gap-3">
              <div className="text-3xl font-bold text-[#5B3778] font-mono tracking-wider">
                09:12 AM
              </div>
              <p className="text-xs text-[#6E637F] font-medium">
                {isCheckedIn ? "You're checked in since 09:12 AM (06h 42m elapsed)" : "You checked out at 06:15 PM"}
              </p>
              <Button
                variant={isCheckedIn ? "danger" : "primary"}
                className={`mt-2 px-8 py-3 rounded-full text-xs font-bold shadow-lg ${
                  isCheckedIn ? "bg-[#DD5471]" : "bg-[#0FA98C]"
                }`}
                onClick={() => setIsCheckedIn(!isCheckedIn)}
              >
                {isCheckedIn ? "Check Out Now" : "Check In Now"}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

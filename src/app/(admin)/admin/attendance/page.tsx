"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AttendanceTable } from "@/components/admin/AttendanceTable";
import { AttendanceService } from "@/services/attendance.service";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance";
import { Clock } from "lucide-react";

export default function AdminAttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  const refreshData = () => {
    setRecords(AttendanceService.getAll());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleStatusChange = (id: string, status: AttendanceStatus) => {
    AttendanceService.updateRecord(id, { status });
    refreshData();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" /> Attendance Management
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Company-wide attendance monitoring, date range logs, and manual overrides</p>
        </div>

        <AttendanceTable records={records} onStatusChange={handleStatusChange} />
      </div>
    </DashboardLayout>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProfileCard } from "@/components/employee/ProfileCard";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmployeeService } from "@/services/employee.service";
import { AttendanceService } from "@/services/attendance.service";
import { LeaveService } from "@/services/leave.service";
import { Employee } from "@/types/employee";
import { ArrowLeft, Edit3, Shield, Clock, CalendarDays, DollarSign } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function SingleEmployeePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (id) {
      const data = EmployeeService.getById(id);
      if (data) {
        setEmployee(data);
      }
    }
  }, [id]);

  if (!employee) {
    return (
      <DashboardLayout>
        <div className="py-12 text-center text-slate-400">
          <p>Employee record not found.</p>
          <Link href="/admin/employees" className="text-blue-400 text-xs mt-2 inline-block hover:underline">
            Back to Directory
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const attendance = AttendanceService.getByEmployee(employee.id);
  const leaves = LeaveService.getByEmployee(employee.id);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/employees">
            <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Employee Profile Details</h1>
            <p className="text-xs text-slate-400">Detailed overview for {employee.name}</p>
          </div>
        </div>

        <ProfileCard employee={employee} />

        {/* Financials & Status Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2 text-base">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Annual Salary
                </span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold text-white">{formatCurrency(employee.salary)}</div>
              <p className="text-xs text-slate-400 mt-1">Base annual compensation package</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2 text-base">
                  <Clock className="w-4 h-4 text-blue-400" /> Attendance Records
                </span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold text-white">{attendance.length} Logs</div>
              <p className="text-xs text-slate-400 mt-1">Logged check-ins for this period</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2 text-base">
                  <CalendarDays className="w-4 h-4 text-indigo-400" /> Leave History
                </span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold text-white">{leaves.length} Applications</div>
              <p className="text-xs text-slate-400 mt-1">Total requests on file</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

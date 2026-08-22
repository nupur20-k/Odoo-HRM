"use client";

import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Users, Clock, Calendar, CreditCard, ArrowRight, UserPlus } from "lucide-react";
import { DayFlowRibbon } from "@/components/employee/DayFlowRibbon";

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 font-sans">
        {/* Page Head */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#6E637F] uppercase tracking-wider font-sora">
              HR Console
            </div>
            <h1 className="text-2xl font-bold text-[#241B35] font-sora mt-0.5">Executive Dashboard</h1>
          </div>

          <Link href="/admin/employees">
            <Button variant="primary" leftIcon={<UserPlus className="w-4 h-4" />}>
              + Add Employee
            </Button>
          </Link>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardBody className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Total Employees</span>
              <div className="text-3xl font-bold text-[#241B35] font-sora">24</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Present Today</span>
              <div className="text-3xl font-bold text-[#0FA98C] font-sora">19</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">On Leave</span>
              <div className="text-3xl font-bold text-[#DD5471] font-sora">2</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Pending Approvals</span>
              <div className="text-3xl font-bold text-[#E0982A] font-sora">3</div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Operations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Leave Approvals */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Pending Leave Approvals</CardTitle>
              <Link href="/admin/leave" className="text-xs text-[#5B3778] font-semibold hover:underline flex items-center gap-1">
                View All (3) <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardBody className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#F7F2FB] border border-[#E6E0F0] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#241B35] font-sora">Sameer Verma</p>
                  <p className="text-[#6E637F]">Unpaid Leave &bull; 05 Sep</p>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F2FB] border border-[#E6E0F0] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#241B35] font-sora">Anjali Nair</p>
                  <p className="text-[#6E637F]">Sick Leave &bull; 20 Aug — 22 Aug</p>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F2FB] border border-[#E6E0F0] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#241B35] font-sora">Kabir Joshi</p>
                  <p className="text-[#6E637F]">Paid Leave &bull; 01 Sep — 03 Sep</p>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>
            </CardBody>
          </Card>

          {/* Department Work Patterns Snapshot */}
          <Card>
            <CardHeader>
              <CardTitle>Engineering Team Flow</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
              <DayFlowRibbon />
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

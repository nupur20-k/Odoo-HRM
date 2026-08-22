"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Download, TrendingUp } from "lucide-react";

export default function EmployeePayrollPage() {
  const lineItems = [
    { label: "Basic Salary", amount: "₹45,000", isDeduction: false },
    { label: "House Rent Allowance (HRA)", amount: "₹18,000", isDeduction: false },
    { label: "Special Allowance", amount: "₹12,000", isDeduction: false },
    { label: "Provident Fund (PF)", amount: "-₹3,600", isDeduction: true },
    { label: "Professional Tax (PT)", amount: "-₹200", isDeduction: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 font-sans">
        {/* Page Head */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#6E637F] uppercase tracking-wider font-sora">
              Compensation
            </div>
            <h1 className="text-2xl font-bold text-[#241B35] font-sora mt-0.5">Payroll</h1>
          </div>
          <Badge variant="purple">Next Payout: 31 Aug 2026</Badge>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Wider Card: Payslip Breakdown */}
          <div className="lg:col-span-8">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>August 2026 Payslip Statement</CardTitle>
                <button className="text-xs font-bold text-[#5B3778] hover:underline flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </CardHeader>
              <CardBody className="divide-y divide-[#E6E0F0]">
                {lineItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-3.5 text-xs">
                    <span className="text-[#6E637F] font-medium">{item.label}</span>
                    <span className={`font-mono font-semibold ${item.isDeduction ? "text-[#DD5471]" : "text-[#241B35]"}`}>
                      {item.amount}
                    </span>
                  </div>
                ))}

                {/* Net Pay Row */}
                <div className="flex justify-between pt-4 text-sm font-bold text-[#241B35]">
                  <span className="font-sora">Net Salary (Take Home)</span>
                  <span className="font-mono text-base text-[#0FA98C]">₹71,200</span>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Card: CTC Stat */}
          <div className="lg:col-span-4">
            <Card className="space-y-4">
              <CardHeader>
                <CardTitle>Annual CTC Breakdown</CardTitle>
              </CardHeader>
              <CardBody className="space-y-3">
                <div className="text-3xl font-bold text-[#241B35] font-mono">
                  ₹9,00,000 <span className="text-xs text-[#6E637F] font-normal">/ yr</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#0FA98C] font-semibold bg-[#E2F6F1] px-3 py-1.5 rounded-full w-fit">
                  <TrendingUp className="w-3.5 h-3.5" /> +12% increment last review
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

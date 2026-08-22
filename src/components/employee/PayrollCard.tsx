import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CreditCard, Eye, Download, CheckCircle2 } from "lucide-react";
import { Payslip } from "@/types/payroll";
import { formatCurrency, formatDate } from "@/lib/utils";

export interface PayrollCardProps {
  latestPayslip?: Payslip;
  onViewClick: (payslip: Payslip) => void;
}

export function PayrollCard({ latestPayslip, onViewClick }: PayrollCardProps) {
  if (!latestPayslip) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-400" /> Payroll Summary
            </span>
          </CardTitle>
        </CardHeader>
        <CardBody className="py-6 text-center text-slate-400 text-sm">
          No payslip records available yet for this period.
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-400" /> Latest Payslip
          </span>
          <Badge variant={latestPayslip.status === "Paid" ? "success" : "warning"}>
            {latestPayslip.status}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardBody>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {latestPayslip.month} Net Salary
            </span>
            <div className="text-3xl font-extrabold text-white mt-0.5">
              {formatCurrency(latestPayslip.breakdown.netSalary)}
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Deposited to {latestPayslip.bankAccount}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Eye className="w-3.5 h-3.5" />}
              onClick={() => onViewClick(latestPayslip)}
            >
              View Statement
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

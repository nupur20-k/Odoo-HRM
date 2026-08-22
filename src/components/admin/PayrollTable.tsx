"use client";

import React, { useState } from "react";
import { Payslip, PaymentStatus } from "@/types/payroll";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, DollarSign, CheckCircle2, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export interface PayrollTableProps {
  payslips: Payslip[];
  onStatusChange?: (id: string, status: PaymentStatus) => void;
  onViewStatement?: (payslip: Payslip) => void;
}

export function PayrollTable({ payslips, onStatusChange, onViewStatement }: PayrollTableProps) {
  const [search, setSearch] = useState("");

  const filtered = payslips.filter(
    (p) =>
      p.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusVariant = (status: PaymentStatus) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Processing":
        return "warning";
      default:
        return "neutral";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="w-72">
          <Input
            placeholder="Search employee or department..."
            leftIcon={<Search className="w-4 h-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Gross Pay</TableHead>
            <TableHead>Deductions</TableHead>
            <TableHead>Net Pay</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-slate-500 text-sm">
                No payroll statements generated yet.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div>
                    <p className="font-semibold text-white text-sm">{p.employeeName}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{p.employeeCode}</p>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-slate-300">{p.department}</TableCell>
                <TableCell className="text-xs text-slate-300">{p.month}</TableCell>
                <TableCell className="text-xs text-slate-200">{formatCurrency(p.breakdown.grossSalary)}</TableCell>
                <TableCell className="text-xs text-rose-400">-{formatCurrency(p.breakdown.totalDeductions)}</TableCell>
                <TableCell className="text-sm font-bold text-emerald-400">{formatCurrency(p.breakdown.netSalary)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(p.status)}>{p.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onViewStatement && (
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => onViewStatement(p)}
                      >
                        Details
                      </Button>
                    )}
                    {onStatusChange && p.status !== "Paid" && (
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                        onClick={() => onStatusChange(p.id, "Paid")}
                      >
                        Process Payment
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PayrollTable } from "@/components/admin/PayrollTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PayrollService } from "@/services/payroll.service";
import { EmployeeService } from "@/services/employee.service";
import { Payslip, PaymentStatus } from "@/types/payroll";
import { CreditCard, Plus, CheckCircle2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminPayrollPage() {
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [employees, setEmployees] = useState(EmployeeService.getAll());
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);

  // Generate Modal State
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState("");
  const [month, setMonth] = useState("August 2026");

  const refreshData = () => {
    setPayslips(PayrollService.getAll());
    setEmployees(EmployeeService.getAll());
  };

  useEffect(() => {
    refreshData();
    if (employees.length > 0) {
      setSelectedEmpId(employees[0].id);
    }
  }, []);

  const handleStatusChange = (id: string, status: PaymentStatus) => {
    PayrollService.updateStatus(id, status);
    refreshData();
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = EmployeeService.getById(selectedEmpId);
    if (!emp) return;

    PayrollService.generateForEmployee(
      emp.id,
      emp.name,
      emp.employeeCode,
      emp.department,
      emp.designation,
      emp.salary,
      month
    );

    refreshData();
    setIsGenerateModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-400" /> Payroll Processing
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Generate monthly payslips, manage salary payouts, and view records</p>
          </div>

          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsGenerateModalOpen(true)}>
            Generate New Payslip
          </Button>
        </div>

        <PayrollTable
          payslips={payslips}
          onStatusChange={handleStatusChange}
          onViewStatement={(p) => setSelectedPayslip(p)}
        />
      </div>

      {/* Generate Payslip Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        title="Generate Employee Payslip"
        description="Select employee and period to create salary statement."
      >
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase text-slate-300 block mb-1.5">Select Employee</label>
            <select
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl p-2.5 focus:border-blue-500"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.employeeCode}) - {emp.department}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-300 block mb-1.5">Pay Period / Month</label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl p-2.5 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsGenerateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Generate & Save
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Payslip Statement Modal */}
      <Modal
        isOpen={!!selectedPayslip}
        onClose={() => setSelectedPayslip(null)}
        title={`Payslip Statement - ${selectedPayslip?.month}`}
        maxWidth="lg"
      >
        {selectedPayslip && (
          <div className="space-y-4 text-xs text-slate-200">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] text-slate-500 uppercase font-semibold">Employee</p>
                <p className="font-semibold text-white">{selectedPayslip.employeeName}</p>
                <p className="text-slate-400">{selectedPayslip.designation}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-slate-500 uppercase font-semibold">Status</p>
                <span className="text-emerald-400 font-bold">{selectedPayslip.status}</span>
                <p className="text-slate-400">{formatDate(selectedPayslip.paymentDate)}</p>
              </div>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <div className="bg-slate-800/80 px-4 py-2 font-semibold text-white text-xs">Earnings</div>
              <div className="p-3 space-y-1.5 bg-slate-900/50">
                <div className="flex justify-between">
                  <span className="text-slate-400">Basic Salary</span>
                  <span className="font-medium text-white">{formatCurrency(selectedPayslip.breakdown.basic)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">HRA</span>
                  <span className="font-medium text-white">{formatCurrency(selectedPayslip.breakdown.hra)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Special Allowance</span>
                  <span className="font-medium text-white">{formatCurrency(selectedPayslip.breakdown.specialAllowance)}</span>
                </div>
              </div>

              <div className="bg-slate-800/80 px-4 py-2 font-semibold text-white text-xs border-t border-slate-800">Deductions</div>
              <div className="p-3 space-y-1.5 bg-slate-900/50">
                <div className="flex justify-between text-rose-400">
                  <span>Provident Fund</span>
                  <span>-{formatCurrency(selectedPayslip.breakdown.pfDeduction)}</span>
                </div>
                <div className="flex justify-between text-rose-400">
                  <span>Tax Deduction</span>
                  <span>-{formatCurrency(selectedPayslip.breakdown.taxDeduction)}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                <span className="text-white">Net Salary:</span>
                <span className="text-emerald-400 text-lg">{formatCurrency(selectedPayslip.breakdown.netSalary)}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="primary" size="sm" onClick={() => setSelectedPayslip(null)}>
                Close Statement
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

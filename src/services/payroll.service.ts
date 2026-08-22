import { Payslip } from "@/types/payroll";
import { getStorage, setStorage, KEYS } from "./api";
import { INITIAL_PAYSLIPS } from "@/lib/constants";

export const PayrollService = {
  getAll(): Payslip[] {
    return getStorage<Payslip[]>(KEYS.PAYSLIPS, INITIAL_PAYSLIPS);
  },

  getByEmployee(employeeId: string): Payslip[] {
    const list = this.getAll();
    return list.filter((p) => p.employeeId === employeeId);
  },

  getById(id: string): Payslip | undefined {
    return this.getAll().find((p) => p.id === id);
  },

  updateStatus(id: string, status: "Paid" | "Pending" | "Processing"): Payslip | null {
    const list = this.getAll();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return null;

    list[index] = { ...list[index], status };
    setStorage(KEYS.PAYSLIPS, list);
    return list[index];
  },

  generateForEmployee(employeeId: string, employeeName: string, employeeCode: string, department: string, designation: string, baseSalary: number, month: string): Payslip {
    const list = this.getAll();
    const basic = Math.round(baseSalary * 0.5 / 12);
    const hra = Math.round(baseSalary * 0.2 / 12);
    const specialAllowance = Math.round(baseSalary * 0.3 / 12);
    const pfDeduction = Math.round(basic * 0.12);
    const taxDeduction = Math.round((basic + hra + specialAllowance) * 0.1);
    const grossSalary = basic + hra + specialAllowance;
    const totalDeductions = pfDeduction + taxDeduction;
    const netSalary = grossSalary - totalDeductions;

    const newPayslip: Payslip = {
      id: `pay-${employeeId}-${Date.now().toString().slice(-4)}`,
      employeeId,
      employeeName,
      employeeCode,
      department,
      designation,
      month,
      paymentDate: new Date().toISOString().split("T")[0],
      status: "Processing",
      breakdown: {
        basic,
        hra,
        specialAllowance,
        bonus: 0,
        pfDeduction,
        taxDeduction,
        grossSalary,
        totalDeductions,
        netSalary,
      },
      bankAccount: "•••• •••• " + Math.floor(1000 + Math.random() * 9000),
    };

    setStorage(KEYS.PAYSLIPS, [newPayslip, ...list]);
    return newPayslip;
  },
};

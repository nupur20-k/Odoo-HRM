export type PaymentStatus = 'Paid' | 'Pending' | 'Processing';

export interface SalaryBreakdown {
  basic: number;
  hra: number;
  specialAllowance: number;
  bonus: number;
  pfDeduction: number;
  taxDeduction: number;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
}

export interface Payslip {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  department: string;
  designation: string;
  month: string; // e.g., "August 2026"
  paymentDate: string;
  status: PaymentStatus;
  breakdown: SalaryBreakdown;
  bankAccount: string;
}

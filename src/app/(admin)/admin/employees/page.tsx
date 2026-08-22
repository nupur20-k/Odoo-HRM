"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { DayFlowRibbon } from "@/components/employee/DayFlowRibbon";
import { Plus, Users, Clock, Calendar, AlertCircle } from "lucide-react";

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState([
    { id: "1", code: "DF-2291", name: "Priya Shah", dept: "Engineering", status: "Present", pill: "success" },
    { id: "2", code: "DF-2104", name: "Rohan Kulkarni", dept: "Engineering", status: "Present", pill: "success" },
    { id: "3", code: "DF-1988", name: "Anjali Nair", dept: "Marketing", status: "On Leave", pill: "danger" },
    { id: "4", code: "DF-2033", name: "Sameer Verma", dept: "Sales", status: "Half-day", pill: "warning" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [dept, setDept] = useState("Engineering");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setEmployees([
      ...employees,
      { id: Date.now().toString(), code: code || "DF-2400", name: name || "New Joiner", dept, status: "Present", pill: "success" }
    ]);
    setIsModalOpen(false);
    setName("");
    setCode("");
  };

  const getInitials = (n: string) => {
    const parts = n.split(" ");
    return parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}` : n.slice(0, 2);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 font-sans">
        {/* Page Head */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#6E637F] uppercase tracking-wider font-sora">
              HR Console
            </div>
            <h1 className="text-2xl font-bold text-[#241B35] font-sora mt-0.5">Employees</h1>
          </div>
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
            + Add Employee
          </Button>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardBody className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Total Employees</span>
              <div className="text-3xl font-bold text-[#241B35] font-sora">{employees.length + 20}</div>
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

        {/* All Employees Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Employees Directory</CardTitle>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Today&apos;s Flow</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#EFE6F5] text-[#5B3778] flex items-center justify-center font-bold text-xs font-sora">
                          {getInitials(emp.name)}
                        </div>
                        <div>
                          <p className="font-bold text-[#241B35] font-sora text-xs">{emp.name}</p>
                          <p className="text-[11px] font-mono text-[#A79CBC]">{emp.code}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#6E637F] text-xs">{emp.dept}</TableCell>
                    <TableCell>
                      <DayFlowRibbon mini />
                    </TableCell>
                    <TableCell>
                      <Badge variant={emp.pill as any}>{emp.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Employee"
        description="Onboard an employee to Dayflow."
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <Input label="Full Name" placeholder="Priya Shah" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Employee ID" placeholder="DF-2400" value={code} onChange={(e) => setCode(e.target.value)} required />
          <div>
            <label className="text-xs font-semibold text-[#241B35] block mb-1.5 font-sora">Department</label>
            <select value={dept} onChange={(e) => setDept(e.target.value)} className="w-full bg-white border-[1.5px] border-[#E6E0F0] text-xs rounded-[9px] p-2.5">
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Human Resources">Human Resources</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Save & Onboard</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

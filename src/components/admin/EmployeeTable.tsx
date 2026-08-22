"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Employee } from "@/types/employee";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, ExternalLink, Trash2, Mail, Phone } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DayFlowRibbon } from "@/components/employee/DayFlowRibbon";

export interface EmployeeTableProps {
  employees: Employee[];
  onDelete?: (id: string) => void;
}

export function EmployeeTable({ employees, onDelete }: EmployeeTableProps) {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");

  const filtered = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(search.toLowerCase());

    const matchesDept = departmentFilter === "All" || emp.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  const departments = ["All", "Engineering", "Human Resources", "Marketing", "Sales", "Design", "Finance"];

  return (
    <div className="space-y-4">
      {/* Search and Filters bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search by name, email, or code..."
            leftIcon={<Search className="w-4 h-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                departmentFilter === dept
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department & Role</TableHead>
            <TableHead>Today&apos;s Flow</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Joining Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-slate-500 text-sm">
                No matching employees found.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatarUrl}
                      alt={emp.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <p className="font-semibold text-white text-sm">{emp.name}</p>
                      <span className="text-[11px] text-slate-400 font-mono">{emp.employeeCode}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-xs font-medium text-slate-200">{emp.designation}</p>
                    <p className="text-[11px] text-slate-400">{emp.department}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <DayFlowRibbon mini />
                </TableCell>
                <TableCell>
                  <div className="text-xs text-slate-300 space-y-0.5">
                    <p className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-500" /> {emp.email}
                    </p>
                    <p className="flex items-center gap-1 text-slate-400 text-[11px]">
                      <Phone className="w-3 h-3 text-slate-500" /> {emp.phone}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-slate-300">
                  {formatDate(emp.joiningDate)}
                </TableCell>
                <TableCell>
                  <Badge variant={emp.status === "Active" ? "success" : "warning"}>
                    {emp.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/employees/${emp.id}`}>
                      <Button variant="outline" size="sm" leftIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                        View
                      </Button>
                    </Link>
                    {onDelete && (
                      <button
                        onClick={() => onDelete(emp.id)}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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

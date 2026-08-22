"use client";

import React, { useState } from "react";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Clock, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface AttendanceTableProps {
  records: AttendanceRecord[];
  onStatusChange?: (id: string, status: AttendanceStatus) => void;
}

export function AttendanceTable({ records, onStatusChange }: AttendanceTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filtered = records.filter((r) => {
    const matchesSearch = r.employeeName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case "Present":
        return <Badge variant="success">Present</Badge>;
      case "Late":
        return <Badge variant="warning">Late</Badge>;
      case "On Leave":
        return <Badge variant="info">On Leave</Badge>;
      case "Absent":
        return <Badge variant="danger">Absent</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const statuses = ["All", "Present", "Late", "On Leave", "Absent"];

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search employee name..."
            leftIcon={<Search className="w-4 h-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Clock In</TableHead>
            <TableHead>Clock Out</TableHead>
            <TableHead>Total Hours</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-slate-500 text-sm">
                No attendance logs match your filter.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-semibold text-white">{record.employeeName}</TableCell>
                <TableCell className="text-xs text-slate-300">{formatDate(record.date)}</TableCell>
                <TableCell className="text-xs font-mono text-emerald-400">{record.checkIn || "--:--"}</TableCell>
                <TableCell className="text-xs font-mono text-rose-400">{record.checkOut || "--:--"}</TableCell>
                <TableCell className="text-xs text-slate-200">{record.totalHours ? `${record.totalHours} hrs` : "In Progress"}</TableCell>
                <TableCell>{getStatusBadge(record.status)}</TableCell>
                <TableCell className="text-right">
                  {onStatusChange && (
                    <select
                      value={record.status}
                      onChange={(e) => onStatusChange(record.id, e.target.value as AttendanceStatus)}
                      className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Present">Present</option>
                      <option value="Late">Late</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Absent">Absent</option>
                    </select>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

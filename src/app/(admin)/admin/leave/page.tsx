"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Check, X } from "lucide-react";

export default function AdminLeavePage() {
  const [approvals, setApprovals] = useState([
    { id: "1", initials: "SV", name: "Sameer Verma", type: "Unpaid Leave", dates: "05 Sep", remarks: "Personal work", status: "Pending", isResolved: false },
    { id: "2", initials: "AN", name: "Anjali Nair", type: "Sick Leave", dates: "20 Aug — 22 Aug", remarks: "Viral fever", status: "Pending", isResolved: false },
    { id: "3", initials: "KJ", name: "Kabir Joshi", type: "Paid Leave", dates: "01 Sep — 03 Sep", remarks: "Travel", status: "Pending", isResolved: false },
  ]);

  const handleResolve = (id: string, newStatus: "Approved" | "Rejected") => {
    setApprovals(
      approvals.map((item) => {
        if (item.id === id) {
          return { ...item, status: newStatus, isResolved: true };
        }
        return item;
      })
    );
  };

  const getInitials = (n: string) => {
    const parts = n.split(" ");
    return parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}` : n.slice(0, 2);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 font-sans">
        {/* Page Head */}
        <div>
          <div className="text-xs font-semibold text-[#6E637F] uppercase tracking-wider font-sora">
            HR Console
          </div>
          <h1 className="text-2xl font-bold text-[#241B35] font-sora mt-0.5">Leave Approvals</h1>
        </div>

        {/* Approvals Table Card */}
        <Card>
          <CardHeader>
            <CardTitle>Pending & Resolved Applications</CardTitle>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvals.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#EFE6F5] text-[#5B3778] flex items-center justify-center font-bold text-xs font-sora">
                          {row.initials}
                        </div>
                        <span className="font-bold text-[#241B35] font-sora text-xs">{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#241B35] text-xs font-medium">{row.type}</TableCell>
                    <TableCell className="text-[#6E637F] text-xs font-mono">{row.dates}</TableCell>
                    <TableCell className="text-[#6E637F] text-xs">{row.remarks}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.status === "Approved"
                            ? "success"
                            : row.status === "Rejected"
                            ? "danger"
                            : "warning"
                        }
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {!row.isResolved ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleResolve(row.id, "Approved")}
                            className="w-8 h-8 rounded-lg bg-[#E2F6F1] text-[#0FA98C] border border-[#0FA98C]/30 flex items-center justify-center hover:bg-[#0FA98C] hover:text-white transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleResolve(row.id, "Rejected")}
                            className="w-8 h-8 rounded-lg bg-[#FCE9ED] text-[#DD5471] border border-[#DD5471]/30 flex items-center justify-center hover:bg-[#DD5471] hover:text-white transition-colors"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-[#6E637F] font-semibold">Resolved</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}

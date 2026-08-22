"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function EmployeeLeavePage() {
  const [requests, setRequests] = useState([
    { id: "1", type: "Paid Leave", dates: "25 Aug — 26 Aug", days: "2", remarks: "Family function", status: "Approved", variant: "success" },
    { id: "2", type: "Sick Leave", dates: "10 Aug", days: "1", remarks: "Doctor appointment", status: "Approved", variant: "success" },
    { id: "3", type: "Unpaid Leave", dates: "01 Jul — 02 Jul", days: "2", remarks: "Personal work", status: "Rejected", variant: "danger" },
  ]);

  const [leaveType, setLeaveType] = useState("Paid Leave");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq = {
      id: Date.now().toString(),
      type: leaveType,
      dates: fromDate && toDate ? `${fromDate} — ${toDate}` : "Pending Dates",
      days: "1",
      remarks: remarks || "Leave application",
      status: "Pending",
      variant: "warning",
    };
    setRequests([newReq, ...requests]);
    setFromDate("");
    setToDate("");
    setRemarks("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 font-sans">
        {/* Page Head */}
        <div>
          <div className="text-xs font-semibold text-[#6E637F] uppercase tracking-wider font-sora">
            Time Off
          </div>
          <h1 className="text-2xl font-bold text-[#241B35] font-sora mt-0.5">Leave Requests</h1>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Wider Card: Request History Table */}
          <div className="lg:col-span-7">
            <Card>
              <CardHeader>
                <CardTitle>Request History</CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Remarks</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-semibold text-[#241B35] font-sora">{r.type}</TableCell>
                        <TableCell className="text-[#6E637F]">{r.dates}</TableCell>
                        <TableCell className="font-mono text-[#241B35]">{r.days}</TableCell>
                        <TableCell className="text-[#6E637F] text-xs truncate max-w-[120px]">{r.remarks}</TableCell>
                        <TableCell>
                          <Badge variant={r.variant as any}>{r.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </div>

          {/* Right Card: Apply Form */}
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Apply for Leave</CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-[#241B35] block mb-1.5 font-sora">Leave Type</label>
                    <select
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                      className="w-full bg-white border-[1.5px] border-[#E6E0F0] text-xs text-[#241B35] rounded-[9px] p-2.5 focus:border-[#5B3778] focus:ring-2 focus:ring-[#EFE6F5]"
                    >
                      <option value="Paid Leave">Paid Leave</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Unpaid Leave">Unpaid Leave</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input label="From Date" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
                    <Input label="To Date" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#241B35] block mb-1.5 font-sora">Remarks</label>
                    <textarea
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="State your reason for time off..."
                      className="w-full bg-white border-[1.5px] border-[#E6E0F0] text-xs text-[#241B35] rounded-[9px] p-2.5 focus:border-[#5B3778] focus:ring-2 focus:ring-[#EFE6F5]"
                      rows={3}
                      required
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full py-2.5">
                    Submit Request →
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

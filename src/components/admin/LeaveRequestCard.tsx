"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check, X, Calendar, User, MessageSquare } from "lucide-react";
import { LeaveRequest } from "@/types/leave";
import { formatDate } from "@/lib/utils";

export interface LeaveRequestCardProps {
  request: LeaveRequest;
  onApprove: (id: string, comment?: string) => void;
  onReject: (id: string, comment?: string) => void;
}

export function LeaveRequestCard({ request, onApprove, onReject }: LeaveRequestCardProps) {
  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  const getStatusVariant = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "danger";
      default:
        return "warning";
    }
  };

  return (
    <Card className="hover:border-slate-700 transition-colors">
      <CardHeader>
        <CardTitle className="text-base">
          <div className="flex items-center gap-3">
            <img
              src={request.employeeAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
              alt={request.employeeName}
              className="w-8 h-8 rounded-full object-cover border border-slate-700"
            />
            <div>
              <p className="font-semibold text-white text-sm">{request.employeeName}</p>
              <span className="text-[11px] text-slate-400">{request.department}</span>
            </div>
          </div>
          <Badge variant={getStatusVariant(request.status)}>{request.status}</Badge>
        </CardTitle>
      </CardHeader>

      <CardBody className="space-y-3">
        <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
          <span className="text-slate-400 font-medium">{request.leaveType}</span>
          <span className="text-white font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            {formatDate(request.startDate)} - {formatDate(request.endDate)} ({request.totalDays} days)
          </span>
        </div>

        <div className="text-xs text-slate-300 bg-slate-950/30 p-3 rounded-xl border border-slate-800/60">
          <span className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">Reason</span>
          <p className="italic">{request.reason}</p>
        </div>

        {request.status === "Pending" && (
          <div className="pt-2 space-y-2">
            {!showCommentBox ? (
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setShowCommentBox(true)}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Add Note
                </button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="danger"
                    size="sm"
                    leftIcon={<X className="w-3.5 h-3.5" />}
                    onClick={() => onReject(request.id, comment)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Check className="w-3.5 h-3.5" />}
                    onClick={() => onApprove(request.id, comment)}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 animate-in fade-in">
                <textarea
                  placeholder="Optional approval/rejection note..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl text-xs p-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  rows={2}
                />
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onReject(request.id, comment)}
                  >
                    Confirm Reject
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onApprove(request.id, comment)}
                  >
                    Confirm Approve
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {request.reviewedBy && (
          <p className="text-[11px] text-slate-500 pt-1">
            Reviewed by <span className="text-slate-400 font-medium">{request.reviewedBy}</span>
            {request.reviewComment && ` — "${request.reviewComment}"`}
          </p>
        )}
      </CardBody>
    </Card>
  );
}

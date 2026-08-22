"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WorkHistoryView } from "@/components/worklog/WorkHistoryView";

export default function EmployeeWorkHistoryPage() {
  return (
    <DashboardLayout>
      <WorkHistoryView />
    </DashboardLayout>
  );
}

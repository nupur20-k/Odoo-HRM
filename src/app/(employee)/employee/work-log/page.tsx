"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SmartWorkLogView } from "@/components/worklog/SmartWorkLogView";

export default function EmployeeWorkLogPage() {
  return (
    <DashboardLayout>
      <SmartWorkLogView />
    </DashboardLayout>
  );
}

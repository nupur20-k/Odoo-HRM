"use client";

import React from "react";
import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HREmployeeWorkDetailsView } from "@/components/worklog/HREmployeeWorkDetailsView";

export default function AdminWorkOverviewDetailsPage() {
  const params = useParams();
  const id = (params?.id as string) || "emp-105";

  return (
    <DashboardLayout>
      <HREmployeeWorkDetailsView employeeId={id} />
    </DashboardLayout>
  );
}

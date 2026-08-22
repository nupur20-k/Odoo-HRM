"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HRWorkOverviewView } from "@/components/worklog/HRWorkOverviewView";

export default function AdminWorkOverviewPage() {
  return (
    <DashboardLayout>
      <HRWorkOverviewView />
    </DashboardLayout>
  );
}

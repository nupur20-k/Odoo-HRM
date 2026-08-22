"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { Edit3, User, Mail, Phone, Calendar, Building, MapPin, Shield } from "lucide-react";

export default function EmployeeProfilePage() {
  const { user } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [phone, setPhone] = useState("+91 98200 12345");
  const [address, setAddress] = useState("742 Evergreen Terrace, Mumbai, India");

  const getUserInitials = (name?: string) => {
    if (!name) return "PS";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 font-sans">
        {/* Page Head */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#6E637F] uppercase tracking-wider font-sora">
              Employee Record
            </div>
            <h1 className="text-2xl font-bold text-[#241B35] font-sora mt-0.5">My Profile</h1>
          </div>
          <Button variant="outline" leftIcon={<Edit3 className="w-4 h-4" />} onClick={() => setIsEditOpen(true)}>
            Edit Details
          </Button>
        </div>

        {/* Profile Details Card */}
        <Card>
          {/* Header Block */}
          <div className="flex items-center gap-5 pb-6 border-b border-[#E6E0F0]">
            <div className="w-16 h-16 rounded-2xl bg-[#EFE6F5] text-[#5B3778] flex items-center justify-center font-bold text-2xl font-sora shrink-0">
              {getUserInitials(user?.name)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#241B35] font-sora">{user?.name || "Priya Shah"}</h2>
              <p className="text-xs text-[#6E637F] mt-1 font-medium">
                {user?.designation || "Senior Software Engineer"} &bull; {user?.department || "Engineering"} &bull; <span className="font-mono text-[#5B3778] font-bold">DF-2291</span>
              </p>
            </div>
          </div>

          {/* Key-Value Pair Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="border-b border-[#E6E0F0] pb-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Work Email</label>
              <div className="text-sm font-medium text-[#241B35]">{user?.email || "priya.shah@dayflow.io"}</div>
            </div>

            <div className="border-b border-[#E6E0F0] pb-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Phone Number</label>
              <div className="text-sm font-medium text-[#241B35]">{phone}</div>
            </div>

            <div className="border-b border-[#E6E0F0] pb-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Date of Joining</label>
              <div className="text-sm font-medium text-[#241B35]">15 Mar 2022</div>
            </div>

            <div className="border-b border-[#E6E0F0] pb-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Reporting Manager</label>
              <div className="text-sm font-medium text-[#241B35]">Rakesh Menon</div>
            </div>

            <div className="border-b border-[#E6E0F0] pb-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Residential Address</label>
              <div className="text-sm font-medium text-[#241B35]">{address}</div>
            </div>

            <div className="border-b border-[#E6E0F0] pb-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Employment Type</label>
              <div className="text-sm font-medium text-[#241B35]">Full-time Permanent</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Edit Details Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Profile Information"
        description="Update your contact phone and residential address."
      >
        <div className="space-y-4">
          <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input label="Home Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => setIsEditOpen(false)}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

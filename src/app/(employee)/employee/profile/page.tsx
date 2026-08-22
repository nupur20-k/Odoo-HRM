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
  const [profile, setProfile] = useState({
    name: user?.name || "Priya Shah",
    email: user?.email || "priya.shah@dayflow.io",
    phone: "+91 98765 43210",
    designation: user?.designation || "Senior Product Designer",
    department: user?.department || "Design Team",
    employeeCode: "DF-2291",
    joiningDate: "03 Feb 2023",
    manager: "Rakesh Menon",
    address: "402, Willow Residency, Pune",
    employmentType: "Full-time • Permanent",
  });
  const [form, setForm] = useState(profile);

  const handleOpenEdit = () => {
    setForm(profile);
    setIsEditOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    setIsEditOpen(false);
  };

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
          <Button variant="outline" leftIcon={<Edit3 className="w-4 h-4" />} onClick={handleOpenEdit}>
            Edit Details
          </Button>
        </div>

        {/* Profile Details Card */}
        <Card>
          {/* Header Block */}
          <div className="flex items-center gap-5 pb-6 border-b border-[#E6E0F0]">
            <div className="w-16 h-16 rounded-2xl bg-[#EFE6F5] text-[#5B3778] flex items-center justify-center font-bold text-2xl font-sora shrink-0">
              {getUserInitials(profile.name)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#241B35] font-sora">{profile.name}</h2>
              <p className="text-xs text-[#6E637F] mt-1 font-medium">
                {profile.designation} &bull; {profile.department} &bull; <span className="font-mono text-[#5B3778] font-bold">{profile.employeeCode}</span>
              </p>
            </div>
          </div>

          {/* Key-Value Pair Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="border-b border-[#E6E0F0] pb-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Work Email</label>
              <div className="text-sm font-medium text-[#241B35]">{profile.email}</div>
            </div>

            <div className="border-b border-[#E6E0F0] pb-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Phone Number</label>
              <div className="text-sm font-medium text-[#241B35]">{profile.phone}</div>
            </div>

            <div className="border-b border-[#E6E0F0] pb-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Date of Joining</label>
              <div className="text-sm font-medium text-[#241B35]">{profile.joiningDate}</div>
            </div>

            <div className="border-b border-[#E6E0F0] pb-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Reporting Manager</label>
              <div className="text-sm font-medium text-[#241B35]">{profile.manager}</div>
            </div>

            <div className="border-b border-[#E6E0F0] pb-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Residential Address</label>
              <div className="text-sm font-medium text-[#241B35]">{profile.address}</div>
            </div>

            <div className="border-b border-[#E6E0F0] pb-3 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A79CBC] font-sora">Employment Type</label>
              <div className="text-sm font-medium text-[#241B35]">{profile.employmentType}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Edit Details Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Profile Information"
        description="Update your personal details and employee record information."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="Work Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Input label="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            <Input label="Reporting Manager" value={form.manager} onChange={(e) => setForm({ ...form, manager: e.target.value })} />
          </div>
          <Input label="Residential Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Save Changes</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

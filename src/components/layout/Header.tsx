"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Bell, Search, LogOut, Shield, UserCheck } from "lucide-react";

export function Header() {
  const router = useRouter();
  const { user, logout, switchRole } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const role = user?.role || "employee";

  const handleRoleToggle = (targetRole: "admin" | "employee") => {
    if (targetRole !== role) {
      switchRole(targetRole);
      router.push(targetRole === "admin" ? "/admin" : "/employee");
    }
  };

  const getUserInitials = (name?: string) => {
    if (!name) return "SJ";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="h-[66px] bg-white border-b border-[#E6E0F0] px-7 flex items-center justify-between sticky top-0 z-30 font-sans shadow-sm">
      {/* Search Input Bar */}
      <div className="flex items-center gap-2 bg-[#F5F3FA] border border-[#E6E0F0] rounded-full px-4 py-2 w-[300px]">
        <Search className="w-4 h-4 text-[#A79CBC] shrink-0" />
        <input
          type="text"
          placeholder="Search employees, requests..."
          className="w-full bg-transparent text-xs text-[#241B35] placeholder-[#A79CBC] focus:outline-none"
        />
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-4">


        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-xl border border-[#E6E0F0] bg-white flex items-center justify-center relative hover:bg-[#F5F3FA] transition-colors"
          >
            <Bell className="w-4 h-4 text-[#6E637F]" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#DD5471]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E6E0F0] rounded-2xl shadow-xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E0F0]">
                <h4 className="text-xs font-bold text-[#241B35] font-sora">Notifications</h4>
                <span className="text-[10px] bg-[#EFE6F5] text-[#5B3778] px-2 py-0.5 rounded-full font-bold">
                  3 New
                </span>
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#F7F2FB] border border-[#E6E0F0] hover:bg-[#EFE6F5] transition-colors cursor-pointer">
                  <p className="font-semibold text-[#241B35]">Leave Approved</p>
                  <p className="text-[#6E637F] text-[11px] mt-0.5">Casual leave for Aug 22 was approved by manager.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F7F2FB] border border-[#E6E0F0] hover:bg-[#EFE6F5] transition-colors cursor-pointer">
                  <p className="font-semibold text-[#241B35]">Payslip Ready</p>
                  <p className="text-[#6E637F] text-[11px] mt-0.5">August payslip statement is now available.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Initials Avatar */}
        <div
          className="w-9 h-9 rounded-xl bg-[#EFE6F5] text-[#5B3778] flex items-center justify-center font-bold text-xs font-sora border border-[#E6E0F0] cursor-pointer"
          title={user?.name || "Priya Shah"}
          onClick={() => router.push(role === "admin" ? "/admin" : "/employee/profile")}
        >
          {getUserInitials(user?.name)}
        </div>
      </div>
    </header>
  );
}

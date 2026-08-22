"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  CreditCard,
  UserCheck,
  ShieldCheck,
  Sparkles,
  LogOut,
  ChevronRight,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  highlight?: boolean;
}

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const role = user?.role || "employee";

  const workspaceNav: NavItem[] = [
    { name: "Dashboard", href: "/employee", icon: LayoutDashboard },
    { name: "AI Leave Assistant", href: "/employee/ai-assistant", icon: Sparkles, highlight: true },
    { name: "My Profile", href: "/employee/profile", icon: UserCheck },
    { name: "My Attendance", href: "/employee/attendance", icon: Clock },
    { name: "My Leave", href: "/employee/leave", icon: Calendar },
    { name: "My Payroll", href: "/employee/payroll", icon: CreditCard },
  ];

  const adminNav: NavItem[] = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Employees", href: "/admin/employees", icon: Users },
    { name: "Attendance", href: "/admin/attendance", icon: Clock },
    { name: "Leave Approvals", href: "/admin/leave", icon: Calendar, badge: "3" },
    { name: "Payroll", href: "/admin/payroll", icon: CreditCard },
  ];

  return (
    <aside className="w-[236px] bg-gradient-to-b from-[#452A5D] to-[#3A2350] text-[#EFE3F7] p-5 flex flex-col h-screen sticky top-0 z-40 select-none font-sans">
      {/* Sidebar Brand Header */}
      <div className="flex items-center gap-2.5 pb-6 text-white font-bold text-lg tracking-tight font-sora">
        <span className="w-2.5 h-2.5 rounded-sm bg-[#F0B84E]" />
        Dayflow
      </div>

      {/* Nav Group: Workspace */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1">
        <div>
          <div className="text-[10.5px] uppercase tracking-wider text-[#B79ECF] font-bold px-3 mb-2 font-sora">
            Workspace
          </div>
          <div className="space-y-0.5">
            {workspaceNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150",
                    isActive
                      ? "bg-white/15 text-white shadow-sm font-semibold"
                      : item.highlight
                      ? "bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-400/30"
                      : "text-[#DCC9EA] hover:text-white hover:bg-white/10"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : item.highlight ? "text-purple-300" : "opacity-80")} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#DD5471] text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Nav Group: HR Console (Visible in Admin Mode) */}
        {role === "admin" && (
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-[#B79ECF] font-bold px-3 mb-2 font-sora flex items-center justify-between">
              <span>HR Console</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#F0B84E]" />
            </div>
            <div className="space-y-0.5">
              {adminNav.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150",
                      isActive
                        ? "bg-white/15 text-white shadow-sm font-semibold"
                        : "text-[#DCC9EA] hover:text-white hover:bg-white/10"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "opacity-80")} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#DD5471] text-white font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="pt-3 border-t border-white/10 mt-auto">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#DCC9EA] hover:text-white hover:bg-white/10 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4 opacity-80" />
          Log Out
        </button>
      </div>
    </aside>
  );
}

import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Clock,
  CalendarDays,
  Wallet,
  UserRound,
  Users,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const employeeLinks = [
  { to: "/", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/attendance", label: "Attendance", icon: Clock },
  { to: "/leave", label: "Leave", icon: CalendarDays },
  { to: "/payroll", label: "Payroll", icon: Wallet },
  { to: "/profile", label: "Profile", icon: UserRound },
];

const hrLinks = [
  { to: "/", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/hr/employees", label: "Employees", icon: Users },
  { to: "/hr/attendance", label: "Attendance", icon: Clock },
  { to: "/hr/leaves", label: "Leave requests", icon: CalendarDays },
  { to: "/hr/payroll", label: "Payroll", icon: Wallet },
  { to: "/profile", label: "Profile", icon: UserRound },
];

export default function Sidebar() {
  const { user, isHR, logout } = useAuth();
  const links = isHR ? hrLinks : employeeLinks;

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-line bg-paper-raised">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink">
          <span className="font-display text-sm text-paper">D</span>
        </div>
        <span className="font-display text-lg tracking-tight">Dayflow</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-sage-soft text-sage font-medium"
                  : "text-ink-soft hover:bg-paper hover:text-ink"
              }`
            }
          >
            <Icon size={17} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-line px-3 py-4">
        <div className="flex items-center gap-2.5 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-soft font-display text-sm text-sage">
            {user?.name?.[0]?.toUpperCase() || "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{user?.name}</p>
            <p className="truncate text-xs text-ink-soft">
              {isHR ? "HR" : user?.employee_id}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-clay-soft hover:text-clay"
        >
          <LogOut size={17} strokeWidth={1.8} />
          Sign out
        </button>
      </div>
    </aside>
  );
}

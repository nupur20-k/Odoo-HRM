import React from "react";
import { Employee } from "@/types/employee";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Mail, Phone, MapPin, Building, Calendar, ShieldCheck, Briefcase } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface ProfileCardProps {
  employee: Employee;
  onEdit?: () => void;
}

export function ProfileCard({ employee, onEdit }: ProfileCardProps) {
  return (
    <Card className="relative overflow-hidden">
      {/* Decorative gradient banner background */}
      <div className="h-28 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 -mx-6 -mt-6 border-b border-slate-800" />

      <div className="relative flex flex-col md:flex-row items-start md:items-end justify-between gap-4 -mt-12 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
          <img
            src={employee.avatarUrl}
            alt={employee.name}
            className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-900 shadow-2xl bg-slate-800"
          />
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <h2 className="text-xl font-bold text-white">{employee.name}</h2>
              <Badge variant={employee.status === "Active" ? "success" : "warning"}>
                {employee.status}
              </Badge>
            </div>
            <p className="text-sm font-medium text-slate-400 mt-1 flex items-center gap-1.5 justify-center sm:justify-start">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              {employee.designation} &bull; {employee.department}
            </p>
          </div>
        </div>

        {onEdit && (
          <button
            onClick={onEdit}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl transition-colors font-medium self-end"
          >
            Edit Profile
          </button>
        )}
      </div>

      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-semibold uppercase text-slate-500 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-blue-400" /> Work Email
            </span>
            <p className="text-sm font-medium text-slate-200 truncate">{employee.email}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-semibold uppercase text-slate-500 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-indigo-400" /> Phone
            </span>
            <p className="text-sm font-medium text-slate-200">{employee.phone}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-semibold uppercase text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> Location
            </span>
            <p className="text-sm font-medium text-slate-200">{employee.location}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-semibold uppercase text-slate-500 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-emerald-400" /> Employee Code
            </span>
            <p className="text-sm font-medium text-slate-200">{employee.employeeCode}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-semibold uppercase text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> Date Joined
            </span>
            <p className="text-sm font-medium text-slate-200">{formatDate(employee.joiningDate)}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
            <span className="text-[11px] font-semibold uppercase text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Manager
            </span>
            <p className="text-sm font-medium text-slate-200">{employee.managerName || "Alex Rivera"}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

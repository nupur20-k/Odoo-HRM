import React from "react";
import { cn } from "@/lib/utils";

export function Table({ className, children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-[14px] border border-[#E6E0F0] bg-white shadow-sm">
      <table className={cn("w-full text-left text-xs text-[#241B35]", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn("bg-[#F7F2FB] text-[11px] uppercase font-bold text-[#A79CBC] border-b border-[#E6E0F0] font-sora", className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("divide-y divide-[#E6E0F0]", className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn("hover:bg-[#F5F3FA] transition-colors duration-150", className)} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ className, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn("px-4 py-3 tracking-wider text-[#A79CBC] font-semibold", className)} {...props}>
      {children}
    </th>
  );
}

export function TableCell({ className, children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("px-4 py-3.5 whitespace-nowrap text-[#241B35] font-medium", className)} {...props}>
      {children}
    </td>
  );
}

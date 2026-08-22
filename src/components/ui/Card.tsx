import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({ className, hoverEffect = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-[#E6E0F0] bg-white p-6 shadow-sm transition-all duration-200",
        hoverEffect && "hover:shadow-md hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1 mb-4 pb-3 border-b border-[#E6E0F0]", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-sm font-bold text-[#241B35] tracking-tight font-sora flex items-center justify-between", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-[#6E637F] font-normal", className)} {...props}>
      {children}
    </p>
  );
}

export function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1", className)} {...props}>
      {children}
    </div>
  );
}

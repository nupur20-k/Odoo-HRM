import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, type = "text", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 font-sans">
        {label && (
          <label className="text-xs font-semibold text-[#241B35]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-[#A79CBC] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full bg-white border-[1.5px] border-[#E6E0F0] text-[#241B35] placeholder-[#A79CBC] rounded-[9px] text-xs px-3.5 py-2.5 transition-all duration-150 focus:outline-none focus:border-[#5B3778] focus:ring-2 focus:ring-[#EFE6F5]",
              leftIcon ? "pl-10" : "pl-3.5",
              rightIcon ? "pr-10" : "pr-3.5",
              error && "border-[#DD5471] focus:border-[#DD5471] focus:ring-[#FCE9ED]",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-[#A79CBC]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-[#DD5471] mt-0.5">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatTime(timeString?: string): string {
  if (!timeString) return "--:--";
  return timeString.slice(0, 5);
}

export function formatSecondsToHHMMSS(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Generates an automated Employee Login ID following the system formula:
 * [Company Initials + First two letters of First & Last Name + Year of Joining + Serial Number (4 digits)]
 * Example: Odoo India + John Doe + 2022 + 1 -> OIJODO20220001
 */
export function generateEmployeeLoginId(
  companyName: string = "Dayflow",
  fullName: string = "Priya Shah",
  joiningYear: number | string = 2023,
  serialNumber: number = 1
): string {
  const compWords = companyName.trim().split(" ");
  let compInitials = "";
  if (compWords.length >= 2) {
    compInitials = `${compWords[0][0]}${compWords[1][0]}`.toUpperCase();
  } else {
    compInitials = companyName.slice(0, 2).toUpperCase();
  }

  const nameWords = fullName.trim().split(" ");
  let nameInitials = "";
  if (nameWords.length >= 2) {
    nameInitials = `${nameWords[0].slice(0, 2)}${nameWords[1].slice(0, 2)}`.toUpperCase();
  } else {
    nameInitials = fullName.slice(0, 4).toUpperCase();
  }

  const yearStr = `${joiningYear}`;
  const serialStr = serialNumber.toString().padStart(4, "0");

  return `${compInitials}${nameInitials}${yearStr}${serialStr}`;
}

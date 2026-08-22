"use client";

import React, { useState } from "react";
import { SmartWorkLogView } from "@/components/worklog/SmartWorkLogView";
import { WorkHistoryView } from "@/components/worklog/WorkHistoryView";
import { HRWorkOverviewView } from "@/components/worklog/HRWorkOverviewView";
import { HREmployeeWorkDetailsView } from "@/components/worklog/HREmployeeWorkDetailsView";
import { AttendanceView } from "@/components/employee/AttendanceView";

export default function SinglePageDayflow() {
  // Auth & Nav State
  const [authHidden, setAuthHidden] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [signupRole, setSignupRole] = useState<"Employee" | "HR / Admin">("Employee");
  const [activePage, setActivePage] = useState<"dashboard" | "profile" | "attendance" | "leave" | "payroll" | "admin" | "approvals" | "work-log" | "work-history" | "work-overview" | "work-details" | "calendar-editor" | "performance-appraisal" | "employee-performance">("dashboard");
  const [selectedEmpId, setSelectedEmpId] = useState("emp-105");
  const [currentRole, setCurrentRole] = useState<"employee" | "hr" | "admin">("employee");
  const [loginIdInput, setLoginIdInput] = useState("DFPRSH20230001");
  
  // Password & Upload Photo State
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [autoPassword, setAutoPassword] = useState("DF#Pass2026!");
  const [uploadedPhotoName, setUploadedPhotoName] = useState<string | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$";
    let gen = "DF#";
    for (let i = 0; i < 7; i++) {
      gen += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setAutoPassword(gen);
    setShowPassword(true);
    setShowConfirmPassword(true);
  };
  
  // Attendance State
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  // Profile State
  const [profileData, setProfileData] = useState({
    name: "Priya Shah",
    designation: "Senior Product Designer",
    department: "Design Team",
    employeeCode: "DFPRSH20230001",
    email: "priya.shah@dayflow.io",
    phone: "+91 98765 43210",
    joiningDate: "03 Feb 2023",
    manager: "Rakesh Menon",
    address: "402, Willow Residency, Pune",
    employmentType: "Full-time • Permanent",
  });

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState(profileData);

  // Natural Language Work Log State
  const [nlpInput, setNlpInput] = useState("Worked on employee dashboard and fixed attendance UI.");
  // Directory Filter, Search, View Mode & Selected View-Only Employee State
  const [directoryFilter, setDirectoryFilter] = useState<"all" | "present" | "absent">("all");
  const [directorySearch, setDirectorySearch] = useState("");
  const [directoryViewMode, setDirectoryViewMode] = useState<"grid" | "table">("grid");
  const [selectedViewEmp, setSelectedViewEmp] = useState<any | null>(null);

  const employeeDirectory = [
    {
      id: "DFPRSH20230001",
      code: "DF-2291",
      name: "Priya Shah",
      role: "Senior Product Designer",
      dept: "Design Team",
      email: "priya.shah@dayflow.io",
      phone: "+91 98765 43210",
      joiningDate: "03 Feb 2023",
      manager: "Rakesh Menon",
      status: "present",
      statusBadge: "🟢 Present in Office",
      initials: "PS",
      avatarBg: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
      workSummary: "Designing Dayflow v2.0 UI Components",
    },
    {
      id: "DF-2104",
      code: "DF-2104",
      name: "Rohan Kulkarni",
      role: "Senior Fullstack Engineer",
      dept: "Engineering",
      email: "rohan.k@dayflow.io",
      phone: "+91 98111 22233",
      joiningDate: "12 Aug 2022",
      manager: "Vikas Sharma",
      status: "present",
      statusBadge: "🟢 Present in Office",
      initials: "RK",
      avatarBg: "linear-gradient(135deg, #2563EB, #1D4ED8)",
      workSummary: "Refactoring Attendance API Microservices",
    },
    {
      id: "DF-2201",
      code: "DF-2201",
      name: "Neha Sharma",
      role: "Frontend Developer",
      dept: "Engineering",
      email: "neha.s@dayflow.io",
      phone: "+91 97222 33344",
      joiningDate: "01 Nov 2023",
      manager: "Rohan Kulkarni",
      status: "present",
      statusBadge: "🟢 Present in Office",
      initials: "NS",
      avatarBg: "linear-gradient(135deg, #059669, #047857)",
      workSummary: "Building Leave Module Interactive Views",
    },
    {
      id: "DF-2190",
      code: "DF-2190",
      name: "Vikram Malhotra",
      role: "Backend Architect",
      dept: "Engineering",
      email: "vikram.m@dayflow.io",
      phone: "+91 96333 44455",
      joiningDate: "15 Mar 2021",
      manager: "CTO",
      status: "present",
      statusBadge: "🟢 Present in Office",
      initials: "VM",
      avatarBg: "linear-gradient(135deg, #D97706, #B45309)",
      workSummary: "Database Performance Tuning & Indexing",
    },
    {
      id: "DF-1988",
      code: "DF-1988",
      name: "Anjali Nair",
      role: "Growth Lead",
      dept: "Marketing",
      email: "anjali.n@dayflow.io",
      phone: "+91 95444 55566",
      joiningDate: "10 Jun 2020",
      manager: "Rakesh Menon",
      status: "absent",
      statusBadge: "✈️ On Leave (Casual)",
      initials: "AN",
      avatarBg: "linear-gradient(135deg, #EF4444, #B91C1C)",
      workSummary: "On Approved Casual Leave",
    },
    {
      id: "DF-2033",
      code: "DF-2033",
      name: "Sameer Verma",
      role: "Enterprise Sales Lead",
      dept: "Sales",
      email: "sameer.v@dayflow.io",
      phone: "+91 94555 66677",
      joiningDate: "05 Jan 2022",
      manager: "VP Sales",
      status: "absent",
      statusBadge: "🔴 Absent Today",
      initials: "SV",
      avatarBg: "linear-gradient(135deg, #DC2626, #991B1B)",
      workSummary: "Absent - Unapplied Time Off",
    },
    {
      id: "DF-2311",
      code: "DF-2311",
      name: "Kavita Reddy",
      role: "QA Lead Engineer",
      dept: "Engineering",
      email: "kavita.r@dayflow.io",
      phone: "+91 93666 77788",
      joiningDate: "20 May 2023",
      manager: "Rohan Kulkarni",
      status: "present",
      statusBadge: "🟢 Present in Office",
      initials: "KR",
      avatarBg: "linear-gradient(135deg, #7C3AED, #5B21B6)",
      workSummary: "E2E Automated Testing for Payroll",
    },
    {
      id: "DF-2099",
      code: "DF-2099",
      name: "Amit Patel",
      role: "DevOps Lead",
      dept: "Operations",
      email: "amit.p@dayflow.io",
      phone: "+91 92777 88899",
      joiningDate: "18 Sep 2021",
      manager: "System Administrator",
      status: "absent",
      statusBadge: "🔴 Absent Today",
      initials: "AP",
      avatarBg: "linear-gradient(135deg, #E11D48, #9F1239)",
      workSummary: "Absent - Unapplied Time Off",
    },
  ];

  // Leave Applications State
  const [leaveHistory, setLeaveHistory] = useState([
    { id: "1", type: "Sick Leave", dates: "12 Aug — 13 Aug", days: "2", remarks: "Fever", status: "Approved", pill: "pill-teal" },
    { id: "2", type: "Paid Leave", dates: "28 Aug — 29 Aug", days: "2", remarks: "Family function", status: "Approved", pill: "pill-teal" },
    { id: "3", type: "Unpaid Leave", dates: "05 Sep", days: "1", remarks: "Personal work", status: "Pending", pill: "pill-amber" },
  ]);

  // Leave Form Fields
  const [leaveType, setLeaveType] = useState("Paid Leave");
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");
  const [leaveRemarks, setLeaveRemarks] = useState("");

  // Admin Approvals State
  const [approvals, setApprovals] = useState([
    { id: "1", initials: "SV", name: "Sameer Verma", type: "Unpaid Leave", dates: "05 Sep", remarks: "Personal work", status: "Pending", resolved: false },
    { id: "2", initials: "AN", name: "Anjali Nair", type: "Sick Leave", dates: "20 Aug — 22 Aug", remarks: "Viral fever", status: "Pending", resolved: false },
    { id: "3", initials: "KJ", name: "Kabir Joshi", type: "Paid Leave", dates: "01 Sep — 03 Sep", remarks: "Travel", status: "Pending", resolved: false },
  ]);

  // Profile Sub-Tab State (Resume | Private Info | Salary Info | Security)
  const [profileTab, setProfileTab] = useState<"resume" | "private" | "salary" | "security">("resume");

  // Editable Resume Section State
  const [aboutText, setAboutText] = useState("Senior Product Designer with over 6 years of experience building modern human-centric enterprise SaaS workflows and design systems.");
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [jobLoveText, setJobLoveText] = useState("I love solving complex workflow problems and collaborating with engineers to turn ideas into sleek, responsive web products that delight users.");
  const [isEditingJobLove, setIsEditingJobLove] = useState(false);
  const [hobbiesText, setHobbiesText] = useState("UI/UX Prototyping, Generative Art, Photography, Hiking, and playing Classical Guitar.");
  const [isEditingHobbies, setIsEditingHobbies] = useState(false);

  const [skillsList, setSkillsList] = useState(["UI/UX Design", "Figma", "Design Systems", "React / Next.js", "User Research", "Wireframing"]);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const [certificationsList, setCertificationsList] = useState(["Google UX Design Professional Certificate", "Certified Design System Specialist (2024)", "Agile & Scrum Essentials"]);
  const [newCertInput, setNewCertInput] = useState("");
  const [isAddingCert, setIsAddingCert] = useState(false);

  // Private Info State
  const [privateInfoData, setPrivateInfoData] = useState({
    dob: "14 Oct 1995",
    residingAddress: "402, Willow Residency, Baner Road, Pune, MH - 411045",
    nationality: "Indian",
    personalEmail: "priya.personal@gmail.com",
    gender: "Female",
    maritalStatus: "Single",
    dateOfJoining: "03 Feb 2023",
    accountNumber: "987654321098",
    bankName: "HDFC Bank Ltd",
    ifscCode: "HDFC0001234",
    panNo: "ABCDE1234F",
    uanNo: "100987654321",
    empCode: "DFPRSH20230001",
  });

  // Salary Info Tab State (Automatic Wage Calculator for Admin / HR)
  const [monthlyWage, setMonthlyWage] = useState<number>(50000);
  const [workingDaysInWeek, setWorkingDaysInWeek] = useState<number>(5);
  const [breakTimeHours, setBreakTimeHours] = useState<number>(1);

  // Dynamic Salary Components State
  const [salaryComponents, setSalaryComponents] = useState([
    { id: "1", name: "Basic Salary", calcType: "percentage", value: 50, basedOn: "wage" },
    { id: "2", name: "House Rent Allowance (HRA)", calcType: "percentage", value: 50, basedOn: "basic" },
    { id: "3", name: "Standard Allowance", calcType: "percentage", value: 16.67, basedOn: "wage" },
    { id: "4", name: "Performance Bonus", calcType: "percentage", value: 8.33, basedOn: "wage" },
    { id: "5", name: "Leave Travel Allowance (LTA)", calcType: "percentage", value: 8.33, basedOn: "wage" },
    { id: "6", name: "Fixed Allowance", calcType: "fixed", value: 2918, basedOn: "wage" },
  ]);

  // Add Component Modal State
  const [isAddComponentOpen, setIsAddComponentOpen] = useState(false);
  const [newCompName, setNewCompName] = useState("");
  const [newCompCalcType, setNewCompCalcType] = useState<"percentage" | "fixed">("percentage");
  const [newCompValue, setNewCompValue] = useState<number>(10);
  const [newCompBasedOn, setNewCompBasedOn] = useState<"wage" | "basic">("wage");

  // PF & Tax Configuration State
  const [employeePfPercent, setEmployeePfPercent] = useState<number>(12);
  const [employerPfPercent, setEmployerPfPercent] = useState<number>(12);
  const [profTaxAmount, setProfTaxAmount] = useState<number>(200);

  // Helper calculation for individual component amount
  const calculateCompAmount = (comp: { name: string; calcType: string; value: number; basedOn: string }, wage: number) => {
    const basicObj = salaryComponents.find(c => c.name.toLowerCase().includes("basic"));
    const basicAmt = basicObj
      ? (basicObj.calcType === "percentage" ? (wage * (basicObj.value / 100)) : basicObj.value)
      : (wage * 0.5);

    if (comp.calcType === "percentage") {
      if (comp.basedOn === "basic") {
        return Math.round(basicAmt * (comp.value / 100));
      }
      return Math.round(wage * (comp.value / 100));
    }
    return comp.value;
  };

  // Salary Computation Formulas
  const yearlyWage = monthlyWage * 12;
  const totalComponentsAmount = salaryComponents.reduce((sum, c) => sum + calculateCompAmount(c, monthlyWage), 0);

  const basicCompObj = salaryComponents.find(c => c.name.toLowerCase().includes("basic"));
  const computedBasicAmt = basicCompObj
    ? (basicCompObj.calcType === "percentage" ? Math.round(monthlyWage * (basicCompObj.value / 100)) : basicCompObj.value)
    : Math.round(monthlyWage * 0.5);

  const computedEmployeePf = Math.round(computedBasicAmt * (employeePfPercent / 100));
  const computedEmployerPf = Math.round(computedBasicAmt * (employerPfPercent / 100));
  const totalDeductions = computedEmployeePf + profTaxAmount;
  const grossSalary = monthlyWage;
  const netSalary = grossSalary - totalDeductions;

  // Validation Check: Total components should not exceed monthly wage
  const isSalaryStructureValid = totalComponentsAmount <= monthlyWage;

  // All Employees Payroll Directory State for HR Management Console
  const [employeePayrolls, setEmployeePayrolls] = useState([
    { id: "DF-2291", code: "DF-2291", name: "Priya Shah", dept: "Design", role: "Senior Product Designer", grossWage: 50000, pf: 3000, tax: 200, netPay: 46800, status: "🟢 Dispatched", initials: "PS", avatarBg: "linear-gradient(135deg, #8B5CF6, #6D28D9)" },
    { id: "DF-2104", code: "DF-2104", name: "Rohan Kulkarni", dept: "Engineering", role: "Senior Fullstack Engineer", grossWage: 75000, pf: 4500, tax: 200, netPay: 70300, status: "🟢 Dispatched", initials: "RK", avatarBg: "linear-gradient(135deg, #2563EB, #1D4ED8)" },
    { id: "DF-2201", code: "DF-2201", name: "Neha Sharma", dept: "Engineering", role: "Frontend Developer", grossWage: 55000, pf: 3300, tax: 200, netPay: 51500, status: "🟢 Dispatched", initials: "NS", avatarBg: "linear-gradient(135deg, #059669, #047857)" },
    { id: "DF-1988", code: "DF-1988", name: "Anjali Nair", dept: "Marketing", role: "Growth Marketing Lead", grossWage: 48000, pf: 2880, tax: 200, netPay: 44920, status: "🟡 Pending Review", initials: "AN", avatarBg: "linear-gradient(135deg, #D97706, #B45309)" },
    { id: "DF-2033", code: "DF-2033", name: "Sameer Verma", dept: "Sales", role: "Account Executive", grossWage: 45000, pf: 2700, tax: 200, netPay: 42100, status: "🟢 Dispatched", initials: "SV", avatarBg: "linear-gradient(135deg, #7C3AED, #5B21B6)" },
    { id: "DF-2150", code: "DF-2150", name: "Kabir Joshi", dept: "Product", role: "Product Manager", grossWage: 62000, pf: 3720, tax: 200, netPay: 58080, status: "🟢 Dispatched", initials: "KJ", avatarBg: "linear-gradient(135deg, #0284C7, #0369A1)" },
    { id: "DF-1802", code: "DF-1802", name: "Vikas Sharma", dept: "Management", role: "VP of Engineering", grossWage: 95000, pf: 5700, tax: 200, netPay: 89100, status: "🟢 Dispatched", initials: "VS", avatarBg: "linear-gradient(135deg, #4F46E5, #3730A3)" },
    { id: "DF-2340", code: "DF-2340", name: "Aditi Patel", dept: "Operations", role: "HR Operations Specialist", grossWage: 52000, pf: 3120, tax: 200, netPay: 48680, status: "🟢 Dispatched", initials: "AP", avatarBg: "linear-gradient(135deg, #E11D48, #9F1239)" },
  ]);

  // Edit Payslip Modal State
  const [editingPayrollEmp, setEditingPayrollEmp] = useState<any | null>(null);
  const [editGrossWage, setEditGrossWage] = useState<number>(50000);
  const [editPfAmount, setEditPfAmount] = useState<number>(3000);
  const [editTaxAmount, setEditTaxAmount] = useState<number>(200);

  // Generate Payslip Modal State
  const [isGeneratePayslipOpen, setIsGeneratePayslipOpen] = useState(false);
  const [genSelectedEmpId, setGenSelectedEmpId] = useState("DF-2291");
  const [genGrossWage, setGenGrossWage] = useState<number>(50000);
  const [payrollSearch, setPayrollSearch] = useState("");

  // Work Overview Live State for HR Console
  const [workOverviewRecords, setWorkOverviewRecords] = useState([
    { id: "DF-2291", code: "DF-2291", name: "Priya Shah", dept: "Design", clockIn: "09:00 AM", clockOut: "06:30 PM", activity: "Figma UI Architecture & Wireframe Components", hours: "8.5 hrs", status: "Checked Out", pill: "pill-gray", initials: "PS", avatarBg: "linear-gradient(135deg, #8B5CF6, #6D28D9)" },
    { id: "DF-2104", code: "DF-2104", name: "Rohan Kulkarni", dept: "Engineering", clockIn: "09:15 AM", clockOut: "— (Working)", activity: "React Next.js API Integration & State Management", hours: "6.2 hrs", status: "Working", pill: "pill-teal", initials: "RK", avatarBg: "linear-gradient(135deg, #2563EB, #1D4ED8)" },
    { id: "DF-2201", code: "DF-2201", name: "Neha Sharma", dept: "Engineering", clockIn: "09:30 AM", clockOut: "— (Working)", activity: "CSS Design System & Glassmorphism Responsive Layout", hours: "5.8 hrs", status: "Working", pill: "pill-teal", initials: "NS", avatarBg: "linear-gradient(135deg, #059669, #047857)" },
    { id: "DF-1988", code: "DF-1988", name: "Anjali Nair", dept: "Marketing", clockIn: "10:00 AM", clockOut: "— (On Break)", activity: "Product Launch Campaign & Growth Strategy Metrics", hours: "4.5 hrs", status: "On Break", pill: "pill-amber", initials: "AN", avatarBg: "linear-gradient(135deg, #D97706, #B45309)" },
    { id: "DF-2033", code: "DF-2033", name: "Sameer Verma", dept: "Sales", clockIn: "08:45 AM", clockOut: "05:45 PM", activity: "Enterprise Client Demo & Contract Negotiation Calls", hours: "8.0 hrs", status: "Checked Out", pill: "pill-gray", initials: "SV", avatarBg: "linear-gradient(135deg, #7C3AED, #5B21B6)" },
    { id: "DF-2150", code: "DF-2150", name: "Kabir Joshi", dept: "Product", clockIn: "09:00 AM", clockOut: "— (Working)", activity: "Q3 Roadmap Sprint Planning & User Backlog Grooming", hours: "6.0 hrs", status: "Working", pill: "pill-teal", initials: "KJ", avatarBg: "linear-gradient(135deg, #0284C7, #0369A1)" },
    { id: "DF-1802", code: "DF-1802", name: "Vikas Sharma", dept: "Management", clockIn: "08:30 AM", clockOut: "06:00 PM", activity: "Executive Strategy Review & Operations Audit", hours: "8.5 hrs", status: "Checked Out", pill: "pill-gray", initials: "VS", avatarBg: "linear-gradient(135deg, #4F46E5, #3730A3)" },
    { id: "DF-2340", code: "DF-2340", name: "Aditi Patel", dept: "Operations", clockIn: "09:00 AM", clockOut: "— (Working)", activity: "HR Onboarding Checklist & Payroll Compliance Audit", hours: "6.5 hrs", status: "Working", pill: "pill-teal", initials: "AP", avatarBg: "linear-gradient(135deg, #E11D48, #9F1239)" },
  ]);

  // Edit Work Log Modal State
  const [editingWorkRecord, setEditingWorkRecord] = useState<any | null>(null);
  const [editWorkClockIn, setEditWorkClockIn] = useState("");
  const [editWorkClockOut, setEditWorkClockOut] = useState("");
  const [editWorkActivity, setEditWorkActivity] = useState("");
  const [editWorkStatus, setEditWorkStatus] = useState("Working");
  const [workOverviewSearch, setWorkOverviewSearch] = useState("");

  // Selected Employee & Month for HR Calendar Log Editor
  const [calSelectedEmpId, setCalSelectedEmpId] = useState("DF-2291");
  const [calSelectedMonth, setCalSelectedMonth] = useState("July 2026");
  
  // Retroactive Edit Modal State
  const [editingCalendarDay, setEditingCalendarDay] = useState<any | null>(null);
  const [retroClockIn, setRetroClockIn] = useState("09:00 AM");
  const [retroClockOut, setRetroClockOut] = useState("06:30 PM");
  const [retroStatus, setRetroStatus] = useState("Present");
  const [retroActivity, setRetroActivity] = useState("");

  // Sample 31-Day Attendance Matrix for Selected Employee
  const [monthCalendarDays, setMonthCalendarDays] = useState([
    { day: 1, date: "01 July 2026", weekday: "Wed", status: "Present", clockIn: "09:00 AM", clockOut: "06:30 PM", activity: "Sprint Kickoff & Backlog Review", hours: "8.5h" },
    { day: 2, date: "02 July 2026", weekday: "Thu", status: "Present", clockIn: "09:12 AM", clockOut: "06:15 PM", activity: "Figma UI Architecture Design", hours: "8.0h" },
    { day: 3, date: "03 July 2026", weekday: "Fri", status: "Present", clockIn: "09:05 AM", clockOut: "06:30 PM", activity: "User Research & Customer Interviews", hours: "8.5h" },
    { day: 4, date: "04 July 2026", weekday: "Sat", status: "Weekend", clockIn: "—", clockOut: "—", activity: "Weekend", hours: "0h" },
    { day: 5, date: "05 July 2026", weekday: "Sun", status: "Weekend", clockIn: "—", clockOut: "—", activity: "Weekend", hours: "0h" },
    { day: 6, date: "06 July 2026", weekday: "Mon", status: "Present", clockIn: "09:00 AM", clockOut: "06:00 PM", activity: "Design System Tokens Setup", hours: "8.0h" },
    { day: 7, date: "07 July 2026", weekday: "Tue", status: "Present", clockIn: "09:15 AM", clockOut: "06:45 PM", activity: "Component Refactoring in Next.js", hours: "8.5h" },
    { day: 8, date: "08 July 2026", weekday: "Wed", status: "Missing", clockIn: "—", clockOut: "—", activity: "⚠️ Forgot to Clock In (Worked on Figma Mobile App)", hours: "0h" },
    { day: 9, date: "09 July 2026", weekday: "Thu", status: "Present", clockIn: "09:10 AM", clockOut: "06:20 PM", activity: "API Schema Verification", hours: "8.0h" },
    { day: 10, date: "10 July 2026", weekday: "Fri", status: "Present", clockIn: "09:00 AM", clockOut: "06:30 PM", activity: "Payroll Calculation Edge Case Testing", hours: "8.5h" },
    { day: 11, date: "11 July 2026", weekday: "Sat", status: "Weekend", clockIn: "—", clockOut: "—", activity: "Weekend", hours: "0h" },
    { day: 12, date: "12 July 2026", weekday: "Sun", status: "Weekend", clockIn: "—", clockOut: "—", activity: "Weekend", hours: "0h" },
    { day: 13, date: "13 July 2026", weekday: "Mon", status: "Leave", clockIn: "—", clockOut: "—", activity: "Casual Time Off", hours: "0h" },
    { day: 14, date: "14 July 2026", weekday: "Tue", status: "Present", clockIn: "09:30 AM", clockOut: "06:30 PM", activity: "HR Dashboard Layout Enhancements", hours: "8.0h" },
    { day: 15, date: "15 July 2026", weekday: "Wed", status: "Missing", clockIn: "—", clockOut: "—", activity: "⚠️ Forgot to Clock In (Client Meeting Demo)", hours: "0h" },
    { day: 16, date: "16 July 2026", weekday: "Thu", status: "Present", clockIn: "09:00 AM", clockOut: "06:15 PM", activity: "Performance Metrics & Appraisal Review", hours: "8.2h" },
    { day: 17, date: "17 July 2026", weekday: "Fri", status: "Present", clockIn: "09:00 AM", clockOut: "06:30 PM", activity: "Weekly Progress Demo & Retrospective", hours: "8.5h" },
  ]);

  // Project Performance & Appraisal State
  const [performanceMetrics, setPerformanceMetrics] = useState([
    { id: "DF-2291", code: "DF-2291", name: "Priya Shah", dept: "Design", role: "Senior Product Designer", projects: "Dayflow v2 UI & Mobile App Design (98% On-Time)", hours: "178 hrs", rating: "4.9 ⭐", score: 96.4, recommendedIncrement: 20, status: "🏆 Recommended for Promotion & 20% Hike", avatarBg: "linear-gradient(135deg, #8B5CF6, #6D28D9)", initials: "PS", currentWage: 50000 },
    { id: "DF-2104", code: "DF-2104", name: "Rohan Kulkarni", dept: "Engineering", role: "Senior Fullstack Engineer", projects: "Payroll & Attendance Engine Microservices (96% On-Time)", hours: "182 hrs", rating: "4.8 ⭐", score: 94.2, recommendedIncrement: 18, status: "🏆 Recommended for Promotion & 18% Hike", avatarBg: "linear-gradient(135deg, #2563EB, #1D4ED8)", initials: "RK", currentWage: 75000 },
    { id: "DF-2201", code: "DF-2201", name: "Neha Sharma", dept: "Engineering", role: "Frontend Developer", projects: "Glassmorphism UI System & React Migration (94% On-Time)", hours: "174 hrs", rating: "4.7 ⭐", score: 91.0, recommendedIncrement: 15, status: "⭐ Recommended for Merit Hike (15%)", avatarBg: "linear-gradient(135deg, #059669, #047857)", initials: "NS", currentWage: 55000 },
    { id: "DF-1988", code: "DF-1988", name: "Anjali Nair", dept: "Marketing", role: "Growth Marketing Lead", projects: "Q2 User Acquisition & Brand Campaign (92% On-Time)", hours: "168 hrs", rating: "4.6 ⭐", score: 88.5, recommendedIncrement: 12, status: "⭐ Recommended for Merit Hike (12%)", avatarBg: "linear-gradient(135deg, #D97706, #B45309)", initials: "AN", currentWage: 48000 },
    { id: "DF-2033", code: "DF-2033", name: "Sameer Verma", dept: "Sales", role: "Account Executive", projects: "Enterprise Client Renewals & Sales Pipeline (89% On-Time)", hours: "165 hrs", rating: "4.4 ⭐", score: 84.0, recommendedIncrement: 10, status: "📈 Standard Increment (10%)", avatarBg: "linear-gradient(135deg, #7C3AED, #5B21B6)", initials: "SV", currentWage: 45000 },
    { id: "DF-2150", code: "DF-2150", name: "Kabir Joshi", dept: "Product", role: "Product Manager", projects: "Enterprise SaaS Roadmap & Feature Prioritization (95% On-Time)", hours: "176 hrs", rating: "4.8 ⭐", score: 93.5, recommendedIncrement: 16, status: "🏆 Recommended for Promotion & 16% Hike", avatarBg: "linear-gradient(135deg, #0284C7, #0369A1)", initials: "KJ", currentWage: 62000 },
    { id: "DF-1802", code: "DF-1802", name: "Vikas Sharma", dept: "Management", role: "VP of Engineering", projects: "Engineering Leadership & Infrastructure Scaling (99% On-Time)", hours: "185 hrs", rating: "5.0 ⭐", score: 98.2, recommendedIncrement: 20, status: "🏆 Recommended for Promotion & 20% Hike", avatarBg: "linear-gradient(135deg, #4F46E5, #3730A3)", initials: "VS", currentWage: 95000 },
    { id: "DF-2340", code: "DF-2340", name: "Aditi Patel", dept: "Operations", role: "HR Operations Specialist", projects: "HR Compliance & Employee Onboarding Portal (93% On-Time)", hours: "172 hrs", rating: "4.6 ⭐", score: 89.8, recommendedIncrement: 14, status: "⭐ Recommended for Merit Hike (14%)", avatarBg: "linear-gradient(135deg, #E11D48, #9F1239)", initials: "AP", currentWage: 52000 },
  ]);

  // Appraisal Modal State
  const [appraisalTargetEmp, setAppraisalTargetEmp] = useState<any | null>(null);
  const [customHikePercent, setCustomHikePercent] = useState<number>(15);

  // AI Leave Assistant State (Matching User's Image 1 & Image 2 design)
  const [aiLeaveTypeSelect, setAiLeaveTypeSelect] = useState<"Paid Leave" | "Sick Leave" | "Unpaid Leave">("Paid Leave");
  const [aiLeaveSubmitted, setAiLeaveSubmitted] = useState(false);
  const [aiLeavePrompt, setAiLeavePrompt] = useState("");
  const [aiDocCertName, setAiDocCertName] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: "user" | "ai"; text: string; card?: boolean }>>([
    {
      id: "greeting",
      sender: "ai",
      text: "Hello Nupur! 👋 I am your Dayflow Assistant. Ask me anything about your leave balance, calendar, or team availability. (Try typing: 'I want leave tomorrow')"
    }
  ]);

  const handleSendChatMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const promptText = aiLeavePrompt.trim();
    if (!promptText) return;

    const userMsgId = Date.now().toString();
    const aiMsgId = (Date.now() + 1).toString();

    setChatMessages(prev => [
      ...prev,
      { id: userMsgId, sender: "user", text: promptText },
      { id: aiMsgId, sender: "ai", text: `Sure — here's what I found for tomorrow, Fri 21 Aug:`, card: true }
    ]);
    setAiLeavePrompt("");
    setAiLeaveSubmitted(false);
  };

  // Sick Leave Medical Certificate Upload State
  const [sickCertificateName, setSickCertificateName] = useState<string>("");

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (leaveType === "Sick Leave" && !sickCertificateName) {
      alert("Please upload a doctor certificate / medical note before submitting a Sick Leave request.");
      return;
    }
    const certFileName = sickCertificateName || (leaveType === "Sick Leave" ? "medical_certificate.pdf" : "");
    const newEntry = {
      id: Date.now().toString(),
      type: leaveType,
      dates: `${leaveFrom || "—"} — ${leaveTo || "—"}`,
      days: "1",
      remarks: leaveRemarks || "—",
      status: "Pending",
      pill: "pill-amber",
      certificate: certFileName,
    };
    setLeaveHistory([newEntry, ...leaveHistory]);

    // Push to HR Approvals queue with medical certificate reference
    const newApproval = {
      id: Date.now().toString(),
      name: profileData.name,
      type: `${leaveType} (${leaveFrom || "—"})`,
      dates: `${leaveFrom || "—"} — ${leaveTo || "—"}`,
      remarks: leaveRemarks + (certFileName ? ` [📎 Cert: ${certFileName}]` : ""),
      status: "Pending",
      resolved: false,
      initials: profileData.name.split(" ").map(n => n[0]).join(""),
      certificate: certFileName,
    };
    setApprovals([newApproval, ...approvals]);

    setLeaveFrom("");
    setLeaveTo("");
    setLeaveRemarks("");
    setSickCertificateName("");
  };

  const handleResolveApproval = (id: string, newStatus: "Approved" | "Rejected") => {
    setApprovals(
      approvals.map((app) => (app.id === id ? { ...app, status: newStatus, resolved: true } : app))
    );
  };

  const handleEnterApp = (e?: React.FormEvent, overrideId?: string, overrideRole?: "employee" | "hr" | "admin") => {
    if (e) e.preventDefault();
    const id = overrideId || loginIdInput;
    const lower = id.toLowerCase();

    if (overrideRole === "hr" || lower.includes("hr") || lower.includes("rakesh") || lower.includes("dfhrrk")) {
      setCurrentRole("hr");
      setProfileData({
        name: "Rakesh Menon",
        designation: "HR Lead & People Manager",
        department: "Human Resources",
        employeeCode: "DFHRRK20230002",
        email: "rakesh.hr@dayflow.io",
        phone: "+91 98123 45678",
        joiningDate: "15 Jan 2021",
        manager: "Board of Directors",
        address: "101, Executive Towers, Mumbai",
        employmentType: "Full-time • HR Lead",
      });
      setAutoPassword("DF#HRManager2026!");
      setActivePage("work-overview");
    } else if (overrideRole === "admin" || lower.includes("admin") || lower.includes("dfadm")) {
      setCurrentRole("admin");
      setProfileData({
        name: "System Administrator",
        designation: "Head of Operations & Admin",
        department: "Operations",
        employeeCode: "DFADM0001",
        email: "admin@dayflow.io",
        phone: "+91 90000 11111",
        joiningDate: "01 Jan 2020",
        manager: "CTO",
        address: "Dayflow HQ, Tech Park",
        employmentType: "Full-time • System Admin",
      });
      setAutoPassword("DF#SysAdmin2026!");
      setActivePage("work-overview");
    } else {
      setCurrentRole("employee");
      setProfileData({
        name: "Priya Shah",
        designation: "Senior Product Designer",
        department: "Design Team",
        employeeCode: "DFPRSH20230001",
        email: "priya.shah@dayflow.io",
        phone: "+91 98765 43210",
        joiningDate: "03 Feb 2023",
        manager: "Rakesh Menon",
        address: "402, Willow Residency, Pune",
        employmentType: "Full-time • Permanent",
      });
      setAutoPassword("DF#Pass2026!");
      setActivePage("dashboard");
    }
    setAuthHidden(true);
  };

  const handleRoleSwitch = (role: "employee" | "hr" | "admin") => {
    setCurrentRole(role);
    if (role === "hr") {
      setProfileData({
        name: "Rakesh Menon",
        designation: "HR Lead & People Manager",
        department: "Human Resources",
        employeeCode: "DFHRRK20230002",
        email: "rakesh.hr@dayflow.io",
        phone: "+91 98123 45678",
        joiningDate: "15 Jan 2021",
        manager: "Board of Directors",
        address: "101, Executive Towers, Mumbai",
        employmentType: "Full-time • HR Lead",
      });
      setAutoPassword("DF#HRManager2026!");
      setActivePage("work-overview");
    } else if (role === "admin") {
      setProfileData({
        name: "System Administrator",
        designation: "Head of Operations & Admin",
        department: "Operations",
        employeeCode: "DFADM0001",
        email: "admin@dayflow.io",
        phone: "+91 90000 11111",
        joiningDate: "01 Jan 2020",
        manager: "CTO",
        address: "Dayflow HQ, Tech Park",
        employmentType: "Full-time • System Admin",
      });
      setAutoPassword("DF#SysAdmin2026!");
      setActivePage("work-overview");
    } else {
      setProfileData({
        name: "Priya Shah",
        designation: "Senior Product Designer",
        department: "Design Team",
        employeeCode: "DFPRSH20230001",
        email: "priya.shah@dayflow.io",
        phone: "+91 98765 43210",
        joiningDate: "03 Feb 2023",
        manager: "Rakesh Menon",
        address: "402, Willow Residency, Pune",
        employmentType: "Full-time • Permanent",
      });
      setAutoPassword("DF#Pass2026!");
      setActivePage("dashboard");
    }
  };

  return (
    <>
      {/* ================= AUTH SCREEN ================= */}
      {!authHidden && (
        <div id="auth">
          <div className="auth-visual">
            <div className="auth-brand" style={{ display: "inline-block", marginBottom: "12px" }}>
              <img src="/logo/dayflow-logo-dark-bg.svg" alt="Dayflow" style={{ height: "58px", display: "block" }} />
            </div>
            <div className="auth-copy">
              <h1>Every workday,<br />perfectly aligned.</h1>
              <p>One place for attendance, leave and payroll — built so HR spends less time chasing status updates and more time on people.</p>
            </div>
            <div className="ribbon-showcase">
              <div className="rs-top"><span>Today's Flow — Engineering</span><span>09:00 — now</span></div>
              <div className="ribbon">
                <div className="seg seg-work" style={{ flex: 5 }}></div>
                <div className="seg seg-meeting" style={{ flex: 2 }}></div>
                <div className="seg seg-work" style={{ flex: 3 }}></div>
                <div className="seg seg-break" style={{ flex: 1 }}></div>
                <div className="seg seg-work" style={{ flex: 4 }}></div>
              </div>
              <div className="ribbon-time"><span>09:00</span><span>12:00</span><span>15:00</span><span>18:00</span></div>
            </div>
          </div>

          <div className="auth-form-wrap">
            <div className="auth-form">
              <div className="auth-tabs">
                <button
                  type="button"
                  className={`auth-tab ${authTab === "signin" ? "active" : ""}`}
                  onClick={() => setAuthTab("signin")}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={`auth-tab ${authTab === "signup" ? "active" : ""}`}
                  onClick={() => setAuthTab("signup")}
                >
                  Sign Up
                </button>
              </div>

              {authTab === "signin" ? (
                <form onSubmit={handleEnterApp} id="signin-form">
                  <h2 style={{ fontSize: "20px", marginBottom: "2px" }}>Sign In</h2>
                  <p className="sub" style={{ fontSize: "12.5px", marginBottom: "12px" }}>Enter your system-generated Login ID or Email to continue.</p>
                  
                  <div className="field">
                    <label>Login Id/Email :-</label>
                    <input
                      type="text"
                      placeholder="e.g. DFPRSH20230001 or DFHRRK20230002"
                      value={loginIdInput}
                      onChange={(e) => setLoginIdInput(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <label style={{ margin: 0 }}>Password :-</label>
                      <span style={{ fontSize: "10.5px", fontWeight: "600", color: "#059669", background: "#ECFDF5", padding: "1px 7px", borderRadius: "12px", border: "1px solid #A7F3D0" }}>
                        ⚡ Auto-Generated for 1st Time
                      </span>
                    </div>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={autoPassword}
                        onChange={(e) => setAutoPassword(e.target.value)}
                        required
                        style={{ paddingRight: "40px", fontWeight: showPassword ? "600" : "normal" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? "Hide password" : "Show password"}
                        style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)" }}
                      >
                        {showPassword ? (
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: "10px", padding: "9px 16px" }}>SIGN IN</button>

                  {/* Demo Credentials Quick Login Card */}
                  <div style={{ marginTop: "12px", padding: "10px", borderRadius: "8px", background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.18)" }}>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", marginBottom: "6px", display: "flex", alignItems: "center", gap: "5px" }}>
                      🔑 Quick Demo Credentials (Click to Login):
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setLoginIdInput("DFPRSH20230001");
                          setAutoPassword("DF#Pass2026!");
                          handleEnterApp(undefined, "DFPRSH20230001", "employee");
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "6px 9px",
                          borderRadius: "5px",
                          background: "#FFFFFF",
                          border: "1px solid #CBD5E1",
                          cursor: "pointer",
                          textAlign: "left"
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "11px", fontWeight: "700", color: "#1E293B" }}>👤 Employee (Priya Shah)</div>
                          <div style={{ fontSize: "10px", color: "#64748B" }}>ID: <strong>DFPRSH20230001</strong> | Pass: <strong>DF#Pass2026!</strong></div>
                        </div>
                        <span style={{ fontSize: "9.5px", fontWeight: "700", color: "#2563EB", background: "#EFF6FF", padding: "2px 5px", borderRadius: "4px" }}>
                          Dashboard →
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setLoginIdInput("DFHRRK20230002");
                          setAutoPassword("DF#HRManager2026!");
                          handleEnterApp(undefined, "DFHRRK20230002", "hr");
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "6px 9px",
                          borderRadius: "5px",
                          background: "#FFFFFF",
                          border: "1px solid #CBD5E1",
                          cursor: "pointer",
                          textAlign: "left"
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "11px", fontWeight: "700", color: "#1E293B" }}>👔 HR Manager (Rakesh Menon)</div>
                          <div style={{ fontSize: "10px", color: "#64748B" }}>ID: <strong>DFHRRK20230002</strong> | Pass: <strong>DF#HRManager2026!</strong></div>
                        </div>
                        <span style={{ fontSize: "9.5px", fontWeight: "700", color: "#059669", background: "#ECFDF5", padding: "2px 5px", borderRadius: "4px" }}>
                          HR Console →
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  <p className="auth-foot" style={{ marginTop: "10px", textAlign: "center" }}>
                    Don't have an Account?{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); setAuthTab("signup"); }} style={{ fontWeight: "700", color: "var(--primary)" }}>
                      Sign Up
                    </a>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleEnterApp} id="signup-form" style={{ marginTop: "0" }}>
                  <h2 style={{ fontSize: "20px", marginBottom: "2px" }}>Sign Up</h2>
                  <p className="sub" style={{ fontSize: "12.5px", marginBottom: "12px" }}>Create your workspace account.</p>
                  
                  {/* Company Name & Upload Photo */}
                  <div className="field">
                    <label>Company Name :-</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input type="text" placeholder="Enter Company Name" defaultValue="Dayflow Technologies" style={{ flex: 1 }} required />
                      <label
                        style={{
                          background: "#2563EB",
                          color: "#fff",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-sm)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                          boxShadow: "0 2px 4px rgba(37,99,235,0.2)"
                        }}
                        title="Upload Photo"
                      >
                        {uploadedPhotoUrl ? (
                          <img src={uploadedPhotoUrl} alt="Uploaded Photo" style={{ width: "16px", height: "16px", borderRadius: "50%", objectFit: "cover" }} />
                        ) : (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        )}
                        {uploadedPhotoName ? uploadedPhotoName : "Upload Photo"}
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              const file = e.target.files[0];
                              setUploadedPhotoName(file.name.length > 12 ? file.name.slice(0, 10) + "..." : file.name);
                              setUploadedPhotoUrl(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="field">
                    <label>Name :-</label>
                    <input type="text" placeholder="Enter Full Name" defaultValue="Priya Shah" required />
                  </div>

                  {/* Email */}
                  <div className="field">
                    <label>Email :-</label>
                    <input type="email" placeholder="you@company.com" defaultValue="priya.shah@dayflow.io" required />
                  </div>

                  {/* Phone */}
                  <div className="field">
                    <label>Phone :-</label>
                    <input type="tel" placeholder="+91 98765 43210" defaultValue="+91 98765 43210" required />
                  </div>

                  {/* Password with Auto-Generate for Demo */}
                  <div className="field">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <label style={{ margin: 0 }}>Password :-</label>
                      <button
                        type="button"
                        onClick={generateRandomPassword}
                        style={{
                          background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                          color: "#fff",
                          border: "none",
                          padding: "3px 10px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)"
                        }}
                        title="Auto-generate password for demo"
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        Auto-Generate
                      </button>
                    </div>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={autoPassword}
                        onChange={(e) => setAutoPassword(e.target.value)}
                        required
                        style={{ paddingRight: "40px", fontWeight: showPassword ? "600" : "normal" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? "Hide password" : "Show password"}
                        style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)" }}
                      >
                        {showPassword ? (
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password with Eye Toggle */}
                  <div className="field">
                    <label>Confirm Password :-</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={autoPassword}
                        onChange={(e) => setAutoPassword(e.target.value)}
                        required
                        style={{ paddingRight: "40px", fontWeight: showConfirmPassword ? "600" : "normal" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        title={showConfirmPassword ? "Hide password" : "Show password"}
                        style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)" }}
                      >
                        {showConfirmPassword ? (
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: "14px" }}>Sign Up</button>
                  
                  <p className="auth-foot" style={{ marginTop: "14px", textAlign: "center" }}>
                    Already have an account?{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); setAuthTab("signin"); }} style={{ fontWeight: "700", color: "var(--primary)" }}>
                      Sign In
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= APP SHELL ================= */}
      {authHidden && (
        <div id="app" className="active">
          {/* SIDEBAR */}
          <aside className="sidebar" id="sidebar">
            <div className="sb-brand flex items-center gap-2" style={{ padding: "16px 20px 8px" }}>
              <img src="/logo/dayflow-logo-dark-bg.svg" alt="Dayflow Logo" style={{ height: "46px" }} />
            </div>

            <div className="nav-group">
              <div className="nav-label">{currentRole === "employee" ? "Workspace" : currentRole === "admin" ? "Admin Console" : "HR Console"}</div>
              <button className={`nav-item ${activePage === "dashboard" ? "active" : ""}`} onClick={() => setActivePage("dashboard")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>
                Dashboard
              </button>

              {currentRole === "employee" ? (
                <>
                  <button className={`nav-item ${activePage === "work-log" ? "active" : ""}`} onClick={() => setActivePage("work-log")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    My Work Log
                  </button>
                  <button className={`nav-item ${activePage === "work-history" ? "active" : ""}`} onClick={() => setActivePage("work-history")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 16 14"/></svg>
                    Work History
                  </button>
                  <button className={`nav-item ${activePage === "attendance" ? "active" : ""}`} onClick={() => setActivePage("attendance")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 3v3M16 3v3"/></svg>
                    Attendance
                  </button>
                  <button className={`nav-item ${activePage === "leave" ? "active" : ""}`} onClick={() => setActivePage("leave")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v6l4 2"/><circle cx="12" cy="12" r="9"/></svg>
                    Leave
                  </button>
                  <button className={`nav-item ${activePage === "payroll" ? "active" : ""}`} onClick={() => setActivePage("payroll")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="13" rx="2"/><circle cx="12" cy="12.5" r="3"/><path d="M6 6V5a2 2 0 012-2h8a2 2 0 012 2v1"/></svg>
                    Payroll
                  </button>
                  <button className={`nav-item ${activePage === "employee-performance" ? "active" : ""}`} onClick={() => setActivePage("employee-performance")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    My Performance
                  </button>
                  <button className={`nav-item ${activePage === "profile" ? "active" : ""}`} onClick={() => setActivePage("profile")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>
                    My Profile
                  </button>
                </>
              ) : (
                <>
                  <button className={`nav-item ${activePage === "work-overview" ? "active" : ""}`} onClick={() => setActivePage("work-overview")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    Work Overview
                  </button>
                  <button className={`nav-item ${activePage === "admin" ? "active" : ""}`} onClick={() => setActivePage("admin")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                    Employees Directory
                  </button>
                  <button className={`nav-item ${activePage === "approvals" ? "active" : ""}`} onClick={() => setActivePage("approvals")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                    Approvals <span className="mono" style={{ marginLeft: "auto", background: "var(--rose)", color: "#fff", fontSize: "10px", padding: "1px 6px", borderRadius: "999px" }}>3</span>
                  </button>
                  <button className={`nav-item ${activePage === "payroll" ? "active" : ""}`} onClick={() => setActivePage("payroll")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="13" rx="2"/><circle cx="12" cy="12.5" r="3"/><path d="M6 6V5a2 2 0 012-2h8a2 2 0 012 2v1"/></svg>
                    Payroll Management
                  </button>
                  <button className={`nav-item ${activePage === "calendar-editor" ? "active" : ""}`} onClick={() => setActivePage("calendar-editor")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Calendar Log Editor
                  </button>
                  <button className={`nav-item ${activePage === "performance-appraisal" ? "active" : ""}`} onClick={() => setActivePage("performance-appraisal")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    Performance & Appraisals
                  </button>
                  <button className={`nav-item ${activePage === "profile" ? "active" : ""}`} onClick={() => setActivePage("profile")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>
                    My Profile
                  </button>
                </>
              )}
            </div>

            <div className="sidebar-foot">
              <button className="nav-item" onClick={() => setAuthHidden(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg> Log Out
              </button>
            </div>
          </aside>

          {/* MAIN CONTAINER */}
          <div className="main">
            <div className="topbar">
              <div className="search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
                Search employees, requests…
              </div>
              <div className="top-right" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* Dynamic Role Switcher Badge for Demo */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: currentRole === "hr" ? "#ECFDF5" : currentRole === "admin" ? "#F5F3FF" : "#EFF6FF", border: `1px solid ${currentRole === "hr" ? "#A7F3D0" : currentRole === "admin" ? "#DDD6FE" : "#BFDBFE"}`, padding: "4px 10px", borderRadius: "20px", fontSize: "11.5px", fontWeight: "700", color: currentRole === "hr" ? "#047857" : currentRole === "admin" ? "#6D28D9" : "#1D4ED8" }}>
                  <span>{currentRole === "hr" ? "👔 HR Manager" : currentRole === "admin" ? "⚙️ Admin" : "👤 Employee"}</span>
                  <select
                    value={currentRole}
                    onChange={(e) => handleRoleSwitch(e.target.value as "employee" | "hr" | "admin")}
                    style={{ background: "none", border: "none", fontSize: "11px", fontWeight: "700", color: "inherit", cursor: "pointer", outline: "none" }}
                  >
                    <option value="employee">Employee View</option>
                    <option value="hr">HR Manager View</option>
                    <option value="admin">Admin View</option>
                  </select>
                </div>

                <button className="icon-btn" title="Notifications">
                  <span className="badge-dot"></span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>
                </button>
                <div className="avatar" title={profileData.name}>
                  {profileData.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </div>
              </div>
            </div>

            <div className="content">
              {/* PAGE: DASHBOARD */}
              {activePage === "dashboard" && (
                <section className="page active" id="page-dashboard">
                  <div className="page-head">
                    <div>
                      <div className="eyebrow">{currentRole === "employee" ? "Your Dayflow" : currentRole === "admin" ? "Admin Console" : "HR Console"}</div>
                      <h1>Good morning, {profileData.name.split(" ")[0]} 👋</h1>
                      <p className="desc" style={{ fontSize: "14px", fontWeight: "500", color: "var(--ink-soft)", marginTop: "4px" }}>
                        {currentRole === "employee" ? "Here's what needs your attention today." : "HR Management Console & Workspace Overview."}
                      </p>
                    </div>
                  </div>

                  {currentRole === "employee" ? (
                    <>
                      {/* ACTION-FIRST ATTENTION CARDS */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px", marginBottom: "24px" }}>
                        {/* CARD 1: ATTENDANCE STATUS */}
                        <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--ink)", fontFamily: "'Sora', sans-serif" }}>
                              {isCheckedIn ? "🟢 You're checked in" : "Checked out"}
                            </span>
                          </div>
                          <div>
                            <div className="mono" style={{ fontSize: "24px", fontWeight: "800", color: "var(--ink)" }}>
                              {isCheckedIn ? "09:12 AM" : "06:15 PM"}
                            </div>
                            <div style={{ fontSize: "12.5px", color: "var(--ink-soft)", marginTop: "2px", fontWeight: "500" }}>
                              {isCheckedIn ? "Working for 3h 42m" : "Total today: 8h 10m"}
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button
                              className="btn btn-ghost"
                              style={{ width: "auto", padding: "8px 16px", fontSize: "12.5px" }}
                              onClick={() => setIsCheckedIn(!isCheckedIn)}
                            >
                              {isCheckedIn ? "Check Out" : "Check In"}
                            </button>
                          </div>
                        </div>

                        {/* CARD 2: WORK LOG */}
                        <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "14px" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ fontSize: "16px" }}>📝</span>
                              <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--ink)", fontFamily: "'Sora', sans-serif" }}>
                                Work log
                              </span>
                            </div>
                            <span style={{ fontSize: "10px", fontWeight: "700", color: "var(--amber)", background: "var(--amber-soft)", padding: "2px 8px", borderRadius: "999px" }}>
                              Incomplete
                            </span>
                          </div>
                          <div>
                            <div style={{ fontSize: "17px", fontWeight: "700", color: "var(--ink)", fontFamily: "'Sora', sans-serif" }}>
                              3h 22m unlogged
                            </div>
                            <div style={{ fontSize: "12.5px", color: "var(--ink-soft)", marginTop: "2px", fontWeight: "500" }}>
                              3h 22m of today's work isn't categorized
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button
                              className="btn btn-primary"
                              style={{ width: "auto", padding: "8px 16px", fontSize: "12.5px" }}
                              onClick={() => setActivePage("work-log")}
                            >
                              Complete Work Log
                            </button>
                          </div>
                        </div>

                        {/* CARD 3: LEAVE REQUEST */}
                        <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "16px" }}>🏖️</span>
                            <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--ink)", fontFamily: "'Sora', sans-serif" }}>
                              Leave request
                            </span>
                          </div>
                          <div>
                            <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--ink)", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", gap: "6px" }}>
                              Aug 28–29 <span style={{ color: "var(--teal)", fontWeight: "800" }}>• Approved ✓</span>
                            </div>
                            <div style={{ fontSize: "12.5px", color: "var(--ink-soft)", marginTop: "2px", fontWeight: "500" }}>
                              2 days casual leave approved
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button
                              className="btn btn-ghost"
                              style={{ width: "auto", padding: "8px 16px", fontSize: "12.5px" }}
                              onClick={() => setActivePage("leave")}
                            >
                              View Leave
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-3">
                        <div className="card flow-card">
                          <div className="flow-head">
                            <div>
                              <h3>Your Day Flow</h3>
                              <div className="flow-sub">Live view of today's working pattern</div>
                            </div>
                            <div className="flow-legend">
                              <span><i style={{ background: "var(--primary)" }}></i>Focus</span>
                              <span><i style={{ background: "var(--teal)" }}></i>Meeting</span>
                              <span><i style={{ background: "var(--amber)" }}></i>Break</span>
                              <span><i style={{ background: "var(--line)" }}></i>Idle</span>
                            </div>
                          </div>
                          <div className="ribbon">
                            <div className="seg seg-work" style={{ flex: 4 }}></div>
                            <div className="seg seg-meeting" style={{ flex: 1.4 }}></div>
                            <div className="seg seg-work" style={{ flex: 2.5 }}></div>
                            <div className="seg seg-break" style={{ flex: 1 }}></div>
                            <div className="seg seg-work" style={{ flex: 3 }}></div>
                            <div className="seg seg-idle" style={{ flex: 2 }}></div>
                          </div>
                          <div className="ribbon-time"><span>09:00</span><span>11:00</span><span>13:00</span><span>15:00</span><span>17:00</span></div>
                        </div>

                        <div className="card">
                          <div className="card-head-row"><h3>Recent Alerts</h3><button className="link-btn">Clear all</button></div>
                          <div className="side-list">
                            <div className="side-item"><div className="side-dot" style={{ background: "var(--teal)" }}></div><div><h4>Leave approved</h4><p>Your Aug 28–29 request was approved by Rakesh (HR).</p></div></div>
                            <div className="side-item"><div className="side-dot" style={{ background: "var(--amber)" }}></div><div><h4>Document expiring</h4><p>Your ID proof expires in 12 days — please renew.</p></div></div>
                            <div className="side-item"><div className="side-dot" style={{ background: "var(--primary)" }}></div><div><h4>Payslip ready</h4><p>Your July payslip has been generated.</p></div></div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* HR DASHBOARD LIVE WORK OVERVIEW & ACTIONS */
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      
                      {/* STAT CARDS */}
                      <div className="grid grid-2" style={{ gap: "16px" }}>
                        <div className="card" style={{ padding: "18px 22px", borderLeft: "4px solid #22C55E" }}>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#047857", textTransform: "uppercase" }}>WORKING NOW</span>
                          <div className="mono" style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", marginTop: "4px" }}>
                            {workOverviewRecords.filter(r => r.status === "Working").length} Staff Active
                          </div>
                          <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>Currently clocked in & logged</span>
                        </div>

                        <div className="card" style={{ padding: "18px 22px", borderLeft: "4px solid var(--primary)" }}>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>TOTAL LOGGED HOURS</span>
                          <div className="mono" style={{ fontSize: "22px", fontWeight: "800", color: "var(--primary)", marginTop: "4px" }}>
                            58.5 Hours Today
                          </div>
                          <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>Across all active team members</span>
                        </div>
                      </div>

                      {/* ALL EMPLOYEES WORK ACTIVITY TABLE */}
                      <div className="card" style={{ padding: "24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                          <div>
                            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                              Live Employees Work & Activity Overview
                            </h3>
                            <p style={{ fontSize: "12.5px", color: "var(--ink-soft)", margin: "2px 0 0 0" }}>
                              Live check-in/out times, tasks, and productivity for all staff members.
                            </p>
                          </div>
                          <button className="btn btn-primary" style={{ width: "auto", padding: "6px 14px", fontSize: "12px" }} onClick={() => setActivePage("work-overview")}>
                            Full Console View →
                          </button>
                        </div>

                        <table>
                          <thead>
                            <tr>
                              <th>Employee</th>
                              <th>Department</th>
                              <th>Clock In</th>
                              <th>Clock Out</th>
                              <th>Work Activity & Task Logged</th>
                              <th>Duration</th>
                              <th>Status</th>
                              <th style={{ textAlign: "right" }}>HR Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {workOverviewRecords.slice(0, 5).map((rec) => (
                              <tr key={rec.id}>
                                <td>
                                  <div className="cell-person">
                                    <div className="mini-avatar" style={{ background: rec.avatarBg }}>
                                      {rec.initials}
                                    </div>
                                    <div>
                                      <div className="p-name">{rec.name}</div>
                                      <div className="p-sub mono">{rec.code}</div>
                                    </div>
                                  </div>
                                </td>
                                <td>{rec.dept}</td>
                                <td className="mono" style={{ fontWeight: "700" }}>{rec.clockIn}</td>
                                <td className="mono" style={{ fontWeight: "700", color: rec.status === "Working" ? "var(--teal)" : "inherit" }}>
                                  {rec.clockOut}
                                </td>
                                <td>
                                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#0F172A", maxWidth: "300px", whiteSpace: "normal" }}>
                                    {rec.activity}
                                  </div>
                                </td>
                                <td className="mono" style={{ fontWeight: "700" }}>{rec.hours}</td>
                                <td>
                                  <span className={`pill ${rec.status === "Working" ? "pill-teal" : rec.status === "On Break" ? "pill-amber" : "pill-gray"}`}>
                                    {rec.status}
                                  </span>
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  <button
                                    type="button"
                                    className="btn btn-ghost"
                                    style={{ padding: "4px 10px", fontSize: "11.5px", width: "auto" }}
                                    onClick={() => {
                                      setEditingWorkRecord(rec);
                                      setEditWorkClockIn(rec.clockIn);
                                      setEditWorkClockOut(rec.clockOut);
                                      setEditWorkActivity(rec.activity);
                                      setEditWorkStatus(rec.status);
                                    }}
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                    </div>
                  )}
                </section>
              )}

              {/* PAGE: SMART WORK LOG */}
              {activePage === "work-log" && (
                <section className="page active" id="page-work-log">
                  <SmartWorkLogView />
                </section>
              )}

              {/* PAGE: WORK HISTORY */}
              {activePage === "work-history" && (
                <section className="page active" id="page-work-history">
                  <WorkHistoryView />
                </section>
              )}

              {/* PAGE: HR WORK OVERVIEW */}
              {activePage === "work-overview" && (
                <section className="page active" id="page-work-overview">
                  <HRWorkOverviewView onSelectEmployee={(id) => { setSelectedEmpId(id); setActivePage("work-details"); }} />
                </section>
              )}

              {/* PAGE: HR WORK DETAILS */}
              {activePage === "work-details" && (
                <section className="page active" id="page-work-details">
                  <HREmployeeWorkDetailsView employeeId={selectedEmpId} onBack={() => setActivePage("work-overview")} />
                </section>
              )}

              {/* PAGE: PROFILE (Architecture & UI matching Excalidraw wireframes) */}
              {activePage === "profile" && (
                <section className="page active" id="page-profile">
                  <div className="page-head">
                    <div>
                      <div className="eyebrow">Employee Profile Console</div>
                      <h1>My Profile</h1>
                      <p className="desc" style={{ fontSize: "13.5px", color: "var(--ink-soft)", marginTop: "2px" }}>
                        Manage your profile information, resume details, private identifiers, and salary structure.
                      </p>
                    </div>
                    <button className="btn btn-ghost" onClick={() => { setEditProfileForm(profileData); setIsEditProfileOpen(true); }}>
                      Edit General Info
                    </button>
                  </div>

                  {/* EMPLOYEE HEADER CARD (Matching Wireframe Header) */}
                  <div className="card" style={{ padding: "24px", marginBottom: "22px", background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: "24px", alignItems: "center" }}>
                      
                      {/* Avatar with Upload Photo Button */}
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            width: "88px",
                            height: "88px",
                            borderRadius: "24px",
                            background: uploadedPhotoUrl ? `url(${uploadedPhotoUrl}) center/cover` : "linear-gradient(135deg, var(--primary) 0%, #7A4C99 100%)",
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "30px",
                            fontWeight: "800",
                            fontFamily: "'Sora', sans-serif",
                            boxShadow: "0 8px 20px -6px rgba(91,55,120,0.4)",
                            border: "3px solid #FFFFFF"
                          }}
                        >
                          {!uploadedPhotoUrl && profileData.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                        </div>
                        <label
                          htmlFor="profile-photo-upload-input"
                          style={{
                            position: "absolute",
                            bottom: "-4px",
                            right: "-4px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background: "var(--primary)",
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                            border: "2px solid #FFFFFF"
                          }}
                          title="Upload Photo"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                          <input
                            type="file"
                            id="profile-photo-upload-input"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setUploadedPhotoUrl(URL.createObjectURL(file));
                              }
                            }}
                          />
                        </label>
                      </div>

                      {/* Middle Details: Name, Code, Email, Mobile */}
                      <div>
                        <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#1E293B", margin: "0 0 4px 0", fontFamily: "'Sora', sans-serif" }}>
                          {profileData.name}
                        </h2>
                        <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--primary)", marginBottom: "8px" }}>
                          ID: <strong style={{ color: "#0F172A" }}>{profileData.employeeCode}</strong> • {profileData.designation}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "12.5px", color: "var(--ink-soft)" }}>
                          <div>✉️ Email: <strong style={{ color: "#1E293B" }}>{profileData.email}</strong></div>
                          <div>📱 Mobile: <strong style={{ color: "#1E293B" }}>{profileData.phone}</strong></div>
                        </div>
                      </div>

                      {/* Right Grid: Company, Department, Manager, Location */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", background: "#FFFFFF", padding: "14px 18px", borderRadius: "12px", border: "1px solid var(--line)" }}>
                        <div><span style={{ fontSize: "10.5px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Company</span><div style={{ fontSize: "12.5px", fontWeight: "700", color: "#0F172A" }}>Dayflow Technologies</div></div>
                        <div><span style={{ fontSize: "10.5px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Department</span><div style={{ fontSize: "12.5px", fontWeight: "700", color: "var(--primary)" }}>{profileData.department}</div></div>
                        <div><span style={{ fontSize: "10.5px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Manager</span><div style={{ fontSize: "12.5px", fontWeight: "700", color: "#0F172A" }}>{profileData.manager}</div></div>
                        <div><span style={{ fontSize: "10.5px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Location</span><div style={{ fontSize: "12.5px", fontWeight: "600", color: "#0F172A" }}>{profileData.address.split(",")[2] || "Pune, India"}</div></div>
                      </div>

                    </div>
                  </div>

                  {/* SUB-TABS NAVIGATION BAR (Resume | Private Info | Salary Info | Security) */}
                  <div style={{ display: "flex", gap: "8px", background: "#FFFFFF", padding: "6px", borderRadius: "12px", border: "1px solid var(--line)", marginBottom: "22px" }}>
                    <button
                      type="button"
                      onClick={() => setProfileTab("resume")}
                      style={{
                        flex: 1,
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "13.5px",
                        fontWeight: "700",
                        cursor: "pointer",
                        background: profileTab === "resume" ? "var(--primary)" : "transparent",
                        color: profileTab === "resume" ? "#FFFFFF" : "var(--ink-soft)",
                        transition: ".15s"
                      }}
                    >
                      📄 Resume & Skills
                    </button>

                    <button
                      type="button"
                      onClick={() => setProfileTab("private")}
                      style={{
                        flex: 1,
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "13.5px",
                        fontWeight: "700",
                        cursor: "pointer",
                        background: profileTab === "private" ? "var(--primary)" : "transparent",
                        color: profileTab === "private" ? "#FFFFFF" : "var(--ink-soft)",
                        transition: ".15s"
                      }}
                    >
                      🔒 Private Info
                    </button>

                    <button
                      type="button"
                      onClick={() => setProfileTab("salary")}
                      style={{
                        flex: 1,
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "13.5px",
                        fontWeight: "700",
                        cursor: "pointer",
                        background: profileTab === "salary" ? "var(--primary)" : "transparent",
                        color: profileTab === "salary" ? "#FFFFFF" : "var(--ink-soft)",
                        transition: ".15s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                    >
                      💰 Salary Info <span style={{ fontSize: "10px", background: profileTab === "salary" ? "rgba(255,255,255,0.25)" : "var(--primary-soft)", color: profileTab === "salary" ? "#FFFFFF" : "var(--primary)", padding: "1px 6px", borderRadius: "10px", fontWeight: "800" }}>Admin View</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProfileTab("security")}
                      style={{
                        flex: 1,
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "13.5px",
                        fontWeight: "700",
                        cursor: "pointer",
                        background: profileTab === "security" ? "var(--primary)" : "transparent",
                        color: profileTab === "security" ? "#FFFFFF" : "var(--ink-soft)",
                        transition: ".15s"
                      }}
                    >
                      🛡️ Security
                    </button>
                  </div>

                  {/* SUB-TAB 1: RESUME & SKILLS */}
                  {profileTab === "resume" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px" }}>
                      
                      {/* Left Column: About, Job Love, Hobbies */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        
                        {/* Section: About */}
                        <div className="card" style={{ padding: "22px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1E293B", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                              About
                            </h3>
                            <button
                              type="button"
                              onClick={() => setIsEditingAbout(!isEditingAbout)}
                              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12.5px", fontWeight: "600", color: "var(--primary)" }}
                            >
                              {isEditingAbout ? "✓ Save" : "Edit"}
                            </button>
                          </div>
                          {isEditingAbout ? (
                            <textarea
                              rows={4}
                              value={aboutText}
                              onChange={(e) => setAboutText(e.target.value)}
                              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--primary)", fontSize: "13.5px", fontFamily: "inherit" }}
                            />
                          ) : (
                            <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "var(--ink)", margin: 0 }}>
                              {aboutText}
                            </p>
                          )}
                        </div>

                        {/* Section: What I love about my job */}
                        <div className="card" style={{ padding: "22px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1E293B", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                              What I love about my job
                            </h3>
                            <button
                              type="button"
                              onClick={() => setIsEditingJobLove(!isEditingJobLove)}
                              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12.5px", fontWeight: "600", color: "var(--primary)" }}
                            >
                              {isEditingJobLove ? "✓ Save" : "Edit"}
                            </button>
                          </div>
                          {isEditingJobLove ? (
                            <textarea
                              rows={4}
                              value={jobLoveText}
                              onChange={(e) => setJobLoveText(e.target.value)}
                              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--primary)", fontSize: "13.5px", fontFamily: "inherit" }}
                            />
                          ) : (
                            <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "var(--ink)", margin: 0 }}>
                              {jobLoveText}
                            </p>
                          )}
                        </div>

                        {/* Section: My interests and hobbies */}
                        <div className="card" style={{ padding: "22px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1E293B", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                              My interests and hobbies
                            </h3>
                            <button
                              type="button"
                              onClick={() => setIsEditingHobbies(!isEditingHobbies)}
                              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12.5px", fontWeight: "600", color: "var(--primary)" }}
                            >
                              {isEditingHobbies ? "✓ Save" : "Edit"}
                            </button>
                          </div>
                          {isEditingHobbies ? (
                            <textarea
                              rows={3}
                              value={hobbiesText}
                              onChange={(e) => setHobbiesText(e.target.value)}
                              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--primary)", fontSize: "13.5px", fontFamily: "inherit" }}
                            />
                          ) : (
                            <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "var(--ink)", margin: 0 }}>
                              {hobbiesText}
                            </p>
                          )}
                        </div>

                      </div>

                      {/* Right Column: Skills & Certifications */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        
                        {/* Skills Card */}
                        <div className="card" style={{ padding: "22px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1E293B", margin: 0 }}>
                              Skills
                            </h3>
                            <button
                              type="button"
                              className="btn btn-ghost"
                              style={{ padding: "4px 10px", fontSize: "11.5px" }}
                              onClick={() => setIsAddingSkill(!isAddingSkill)}
                            >
                              + Add Skills
                            </button>
                          </div>

                          {isAddingSkill && (
                            <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                              <input
                                type="text"
                                placeholder="Enter skill name..."
                                value={newSkillInput}
                                onChange={(e) => setNewSkillInput(e.target.value)}
                                style={{ flex: 1, padding: "7px 10px", borderRadius: "6px", border: "1.5px solid var(--line)", fontSize: "13px" }}
                              />
                              <button
                                type="button"
                                className="btn btn-primary"
                                style={{ width: "auto", padding: "6px 14px", fontSize: "12px" }}
                                onClick={() => {
                                  if (newSkillInput.trim()) {
                                    setSkillsList([...skillsList, newSkillInput.trim()]);
                                    setNewSkillInput("");
                                    setIsAddingSkill(false);
                                  }
                                }}
                              >
                                Add
                              </button>
                            </div>
                          )}

                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {skillsList.map((skill, index) => (
                              <span
                                key={index}
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "700",
                                  color: "var(--primary)",
                                  background: "var(--primary-soft)",
                                  padding: "6px 12px",
                                  borderRadius: "20px",
                                  border: "1px solid var(--primary-soft2)"
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Certification Card */}
                        <div className="card" style={{ padding: "22px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1E293B", margin: 0 }}>
                              Certification
                            </h3>
                            <button
                              type="button"
                              className="btn btn-ghost"
                              style={{ padding: "4px 10px", fontSize: "11.5px" }}
                              onClick={() => setIsAddingCert(!isAddingCert)}
                            >
                              + Add Certification
                            </button>
                          </div>

                          {isAddingCert && (
                            <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                              <input
                                type="text"
                                placeholder="Enter certification title..."
                                value={newCertInput}
                                onChange={(e) => setNewCertInput(e.target.value)}
                                style={{ flex: 1, padding: "7px 10px", borderRadius: "6px", border: "1.5px solid var(--line)", fontSize: "13px" }}
                              />
                              <button
                                type="button"
                                className="btn btn-primary"
                                style={{ width: "auto", padding: "6px 14px", fontSize: "12px" }}
                                onClick={() => {
                                  if (newCertInput.trim()) {
                                    setCertificationsList([...certificationsList, newCertInput.trim()]);
                                    setNewCertInput("");
                                    setIsAddingCert(false);
                                  }
                                }}
                              >
                                Add
                              </button>
                            </div>
                          )}

                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {certificationsList.map((cert, index) => (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  padding: "10px 14px",
                                  borderRadius: "8px",
                                  background: "#F8FAFC",
                                  border: "1px solid #E2E8F0"
                                }}
                              >
                                <span style={{ fontSize: "16px" }}>📜</span>
                                <span style={{ fontSize: "13px", fontWeight: "600", color: "#1E293B" }}>{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 2: PRIVATE INFO */}
                  {profileTab === "private" && (
                    <div className="card" style={{ padding: "28px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1E293B", marginBottom: "20px", borderBottom: "1px solid var(--line)", paddingBottom: "10px" }}>
                        Private Personal Information & Financial Identifiers
                      </h3>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                        
                        {/* Personal Details */}
                        <div style={{ background: "#F8FAFC", padding: "20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                          <h4 style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--primary)", marginBottom: "14px", textTransform: "uppercase", letterSpacing: ".05em" }}>
                            Personal Details
                          </h4>
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div className="kv"><label>Date of Birth</label><div>{privateInfoData.dob}</div></div>
                            <div className="kv"><label>Residing Address</label><div>{privateInfoData.residingAddress}</div></div>
                            <div className="kv"><label>Nationality</label><div>{privateInfoData.nationality}</div></div>
                            <div className="kv"><label>Personal Email</label><div>{privateInfoData.personalEmail}</div></div>
                            <div className="kv"><label>Gender</label><div>{privateInfoData.gender}</div></div>
                            <div className="kv"><label>Marital Status</label><div>{privateInfoData.maritalStatus}</div></div>
                            <div className="kv" style={{ border: "none" }}><label>Date of Joining</label><div>{privateInfoData.dateOfJoining}</div></div>
                          </div>
                        </div>

                        {/* Bank Details */}
                        <div style={{ background: "#F8FAFC", padding: "20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                          <h4 style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--primary)", marginBottom: "14px", textTransform: "uppercase", letterSpacing: ".05em" }}>
                            Bank & Tax Identifiers
                          </h4>
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div className="kv"><label>Bank Name</label><div>{privateInfoData.bankName}</div></div>
                            <div className="kv"><label>Account Number</label><div className="mono" style={{ fontWeight: 700 }}>{privateInfoData.accountNumber}</div></div>
                            <div className="kv"><label>IFSC Code</label><div className="mono" style={{ fontWeight: 700 }}>{privateInfoData.ifscCode}</div></div>
                            <div className="kv"><label>PAN No.</label><div className="mono" style={{ fontWeight: 700 }}>{privateInfoData.panNo}</div></div>
                            <div className="kv"><label>UAN No.</label><div className="mono" style={{ fontWeight: 700 }}>{privateInfoData.uanNo}</div></div>
                            <div className="kv" style={{ border: "none" }}><label>Employee Code</label><div className="mono" style={{ fontWeight: 700, color: "var(--primary)" }}>{privateInfoData.empCode}</div></div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 3: SALARY INFO (ADMIN / HR VIEW) */}
                  {profileTab === "salary" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      
                      {/* Admin Exclusive Banner */}
                      <div style={{ background: "#EFF6FF", border: "1.5px solid #BFDBFE", padding: "12px 18px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#1E40AF", fontSize: "13px", fontWeight: "700" }}>
                          <span style={{ fontSize: "16px" }}>🔒</span>
                          <span>Salary Info Tab (Visible to Admin & HR Managers)</span>
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: "800", background: "#DBEAFE", color: "#1D4ED8", padding: "3px 10px", borderRadius: "12px" }}>
                          ADMIN CONFIDENTIAL
                        </span>
                      </div>
                      
                      {/* TOP SALARY SUMMARY CARDS */}
                      <div className="grid grid-3" style={{ gap: "16px" }}>
                        <div className="card" style={{ padding: "20px", background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)", borderLeft: "4px solid var(--primary)" }}>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: ".05em" }}>MONTHLY WAGE</span>
                          <div className="mono" style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", marginTop: "6px" }}>
                            ₹ {monthlyWage.toLocaleString("en-IN")}
                          </div>
                          <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>Gross Base Salary / Month</span>
                        </div>

                        <div className="card" style={{ padding: "20px", background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)", borderLeft: "4px solid var(--teal)" }}>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: ".05em" }}>YEARLY WAGE (CTC)</span>
                          <div className="mono" style={{ fontSize: "24px", fontWeight: "800", color: "var(--teal)", marginTop: "6px" }}>
                            ₹ {yearlyWage.toLocaleString("en-IN")}
                          </div>
                          <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>Annual Cost to Company</span>
                        </div>

                        <div className="card" style={{ padding: "20px", background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)", borderLeft: "4px solid #2563EB" }}>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", letterSpacing: ".05em" }}>NET TAKE HOME PAY</span>
                          <div className="mono" style={{ fontSize: "24px", fontWeight: "800", color: "#2563EB", marginTop: "6px" }}>
                            ₹ {netSalary.toLocaleString("en-IN")}
                          </div>
                          <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>After PF & Professional Tax</span>
                        </div>
                      </div>

                      {/* SALARY SETTINGS CARD */}
                      <div className="card" style={{ padding: "24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1E293B", margin: 0 }}>
                            Salary Settings & Schedule
                          </h3>
                          <span style={{ fontSize: "11.5px", color: "var(--teal)", fontWeight: "700" }}>
                            ⚡ Instant Auto-Calculation Active
                          </span>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", gap: "20px", alignItems: "center" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "11.5px", fontWeight: "700", color: "#64748B", marginBottom: "6px", textTransform: "uppercase" }}>
                              Monthly Wage (₹)
                            </label>
                            <div style={{ position: "relative" }}>
                              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontWeight: "800", color: "var(--primary)" }}>₹</span>
                              <input
                                type="number"
                                value={monthlyWage}
                                onChange={(e) => setMonthlyWage(Math.max(0, Number(e.target.value)))}
                                style={{ padding: "10px 12px 10px 28px", borderRadius: "8px", border: "2px solid var(--primary)", fontSize: "18px", fontWeight: "800", color: "#0F172A", width: "100%" }}
                              />
                            </div>
                            <span style={{ fontSize: "11px", color: "var(--ink-soft)", marginTop: "4px", display: "block" }}>
                              Base wage for calculation
                            </span>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "11.5px", fontWeight: "700", color: "#64748B", marginBottom: "6px", textTransform: "uppercase" }}>
                              Yearly Wage
                            </label>
                            <div className="mono" style={{ fontSize: "18px", fontWeight: "800", color: "var(--teal)" }}>
                              ₹ {yearlyWage.toLocaleString("en-IN")}
                            </div>
                            <span style={{ fontSize: "11px", color: "var(--ink-soft)", marginTop: "4px", display: "block" }}>
                              Monthly × 12
                            </span>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "11.5px", fontWeight: "700", color: "#64748B", marginBottom: "6px", textTransform: "uppercase" }}>
                              Working Days / Wk
                            </label>
                            <select
                              value={workingDaysInWeek}
                              onChange={(e) => setWorkingDaysInWeek(Number(e.target.value))}
                              style={{ padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--line)", fontSize: "13.5px", fontWeight: "700", width: "100%" }}
                            >
                              <option value={5}>5 Days / Week</option>
                              <option value={6}>6 Days / Week</option>
                            </select>
                            <span style={{ fontSize: "11px", color: "var(--ink-soft)", marginTop: "4px", display: "block" }}>
                              Weekly work schedule
                            </span>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "11.5px", fontWeight: "700", color: "#64748B", marginBottom: "6px", textTransform: "uppercase" }}>
                              Break Time
                            </label>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <input
                                type="number"
                                value={breakTimeHours}
                                onChange={(e) => setBreakTimeHours(Number(e.target.value))}
                                style={{ padding: "8px 12px", borderRadius: "8px", border: "1.5px solid var(--line)", fontSize: "14px", fontWeight: "700", width: "70px" }}
                              />
                              <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--ink-soft)" }}>/ hrs</span>
                            </div>
                            <span style={{ fontSize: "11px", color: "var(--ink-soft)", marginTop: "4px", display: "block" }}>
                              Daily break allocation
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* SALARY COMPONENTS TABLE */}
                      <div className="card" style={{ padding: "24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                          <div>
                            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1E293B", margin: 0 }}>
                              Salary Components Breakdown
                            </h3>
                            <p style={{ fontSize: "12px", color: "var(--ink-soft)", margin: "2px 0 0 0" }}>
                              Define salary components as fixed amounts or percentage of wage.
                            </p>
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ width: "auto", padding: "7px 16px", fontSize: "12.5px" }}
                            onClick={() => {
                              setNewCompName("");
                              setNewCompCalcType("percentage");
                              setNewCompValue(10);
                              setNewCompBasedOn("wage");
                              setIsAddComponentOpen(true);
                            }}
                          >
                            + Add Component
                          </button>
                        </div>

                        <table>
                          <thead>
                            <tr>
                              <th>Component Name</th>
                              <th>Calculation Type</th>
                              <th>Defined Value</th>
                              <th>Calculated Monthly Amount</th>
                              <th style={{ textAlign: "right" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {salaryComponents.map((comp) => {
                              const amt = calculateCompAmount(comp, monthlyWage);
                              const getHelperDesc = (name: string) => {
                                if (name.includes("Basic")) return "Define Basic salary from company cost compute % based on monthly Wages";
                                if (name.includes("House Rent") || name.includes("HRA")) return "HRA provided as a % of basic salary";
                                if (name.includes("Standard")) return "A standard allowance is a predetermined fixed amount provided to employees as part of their salary";
                                if (name.includes("Performance")) return "Variable amount paid during payroll. Value defined by company and calculated as % of basic salary";
                                if (name.includes("Travel") || name.includes("LTA")) return "LTA paid by company to employees to cover travel expenses, calculated as % of basic salary";
                                return "Fixed allowance portion of wages is determined after calculating all salary components";
                              };

                              return (
                                <tr key={comp.id}>
                                  <td>
                                    <div style={{ fontWeight: "700", color: "#0F172A" }}>{comp.name}</div>
                                    <div style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px" }}>
                                      {getHelperDesc(comp.name)}
                                    </div>
                                  </td>
                                  <td>
                                    <span className={`pill ${comp.calcType === "percentage" ? "pill-teal" : "pill-gray"}`}>
                                      {comp.calcType === "percentage" ? `Percentage (${comp.basedOn === "basic" ? "% of Basic" : "% of Wage"})` : "Fixed Amount"}
                                    </span>
                                  </td>
                                  <td className="mono" style={{ fontWeight: "700" }}>
                                    {comp.calcType === "percentage" ? `${comp.value}%` : `₹ ${comp.value.toLocaleString("en-IN")}`}
                                  </td>
                                  <td className="mono" style={{ fontWeight: "800", color: "var(--primary)" }}>
                                    ₹ {amt.toLocaleString("en-IN")}.00 / month
                                  </td>
                                  <td style={{ textAlign: "right" }}>
                                    <button
                                      type="button"
                                      onClick={() => setSalaryComponents(salaryComponents.filter((c) => c.id !== comp.id))}
                                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--rose)", fontSize: "14px" }}
                                      title="Remove Component"
                                    >
                                      🗑️
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        {/* COMPONENT SUMMARY & VALIDATION ALERT */}
                        <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                          <div>
                            <div style={{ fontSize: "11.5px", color: "var(--ink-soft)", fontWeight: "700", letterSpacing: ".05em" }}>COMPONENT SUMMARY</div>
                            <div style={{ fontSize: "15px", fontWeight: "800", color: "#0F172A", marginTop: "2px" }}>
                              Total Components: <strong style={{ color: isSalaryStructureValid ? "#059669" : "#DC2626" }}>₹ {totalComponentsAmount.toLocaleString("en-IN")}</strong> / Defined Wage: ₹ {monthlyWage.toLocaleString("en-IN")}
                            </div>
                          </div>

                          <div>
                            {isSalaryStructureValid ? (
                              <span style={{ fontSize: "12px", fontWeight: "700", color: "#047857", background: "#ECFDF5", padding: "6px 14px", borderRadius: "20px", border: "1px solid #A7F3D0" }}>
                                ✓ Salary structure is valid
                              </span>
                            ) : (
                              <span style={{ fontSize: "12px", fontWeight: "700", color: "#B91C1C", background: "#FEF2F2", padding: "6px 14px", borderRadius: "20px", border: "1px solid #FCA5A5" }}>
                                ⚠️ Salary components exceed defined wage. Please adjust component values.
                              </span>
                            )}
                          </div>
                        </div>

                      </div>

                      {/* PROVIDENT FUND & TAX DEDUCTIONS GRID */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        
                        {/* Provident Fund Card */}
                        <div className="card" style={{ padding: "24px" }}>
                          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1E293B", marginBottom: "16px", borderBottom: "1px solid var(--line)", paddingBottom: "10px" }}>
                            Provident Fund (PF) Contribution
                          </h3>

                          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {/* Employee PF */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "12px 14px", borderRadius: "8px" }}>
                              <div>
                                <div style={{ fontSize: "13px", fontWeight: "700", color: "#0F172A" }}>Employee Contribution</div>
                                <div style={{ fontSize: "11.5px", color: "var(--ink-soft)" }}>Calculated at {employeePfPercent}% of Basic (₹{computedBasicAmt.toLocaleString("en-IN")})</div>
                              </div>
                              <div className="mono" style={{ fontSize: "15px", fontWeight: "800", color: "var(--rose)" }}>
                                - ₹ {computedEmployeePf.toLocaleString("en-IN")} / mo
                              </div>
                            </div>

                            {/* Employer PF */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", padding: "12px 14px", borderRadius: "8px" }}>
                              <div>
                                <div style={{ fontSize: "13px", fontWeight: "700", color: "#0F172A" }}>Employer Contribution</div>
                                <div style={{ fontSize: "11.5px", color: "var(--ink-soft)" }}>Calculated at {employerPfPercent}% of Basic (₹{computedBasicAmt.toLocaleString("en-IN")})</div>
                              </div>
                              <div className="mono" style={{ fontSize: "15px", fontWeight: "800", color: "#0F172A" }}>
                                ₹ {computedEmployerPf.toLocaleString("en-IN")} / mo
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Tax Deductions Card */}
                        <div className="card" style={{ padding: "24px" }}>
                          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1E293B", marginBottom: "16px", borderBottom: "1px solid var(--line)", paddingBottom: "10px" }}>
                            Tax Deductions
                          </h3>

                          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <label style={{ fontSize: "13px", fontWeight: "700", color: "#0F172A" }}>Professional Tax (₹ / mo)</label>
                              <input
                                type="number"
                                value={profTaxAmount}
                                onChange={(e) => setProfTaxAmount(Number(e.target.value))}
                                style={{ padding: "6px 12px", borderRadius: "6px", border: "1.5px solid var(--line)", fontSize: "14px", fontWeight: "700", width: "110px", textAlign: "right" }}
                              />
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FEF2F2", padding: "12px 14px", borderRadius: "8px", border: "1px solid #FCA5A5" }}>
                              <div>
                                <div style={{ fontSize: "13px", fontWeight: "700", color: "#B91C1C" }}>Total Monthly Deductions</div>
                                <div style={{ fontSize: "11px", color: "#991B1B" }}>Employee PF + Professional Tax</div>
                              </div>
                              <div className="mono" style={{ fontSize: "16px", fontWeight: "800", color: "#B91C1C" }}>
                                - ₹ {totalDeductions.toLocaleString("en-IN")}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* FINAL SALARY SUMMARY & SAVE ACTIONS */}
                      <div className="card" style={{ padding: "24px", background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)", border: "2px solid var(--line)" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1E293B", marginBottom: "16px", borderBottom: "1px solid var(--line)", paddingBottom: "10px" }}>
                          Final Salary Computation Summary
                        </h3>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "center" }}>
                          
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px" }}>
                              <span style={{ color: "var(--ink-soft)" }}>Gross Salary (Monthly Wage)</span>
                              <span className="mono" style={{ fontWeight: "700" }}>₹ {grossSalary.toLocaleString("en-IN")}.00</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px" }}>
                              <span style={{ color: "var(--ink-soft)" }}>Employee PF ({employeePfPercent}%)</span>
                              <span className="mono" style={{ fontWeight: "700", color: "var(--rose)" }}>- ₹ {computedEmployeePf.toLocaleString("en-IN")}.00</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px" }}>
                              <span style={{ color: "var(--ink-soft)" }}>Professional Tax</span>
                              <span className="mono" style={{ fontWeight: "700", color: "var(--rose)" }}>- ₹ {profTaxAmount.toLocaleString("en-IN")}.00</span>
                            </div>
                          </div>

                          <div style={{ background: "#ECFDF5", padding: "18px 24px", borderRadius: "12px", border: "1.5px solid #A7F3D0", display: "flex", flexDirection: "column", gap: "4px" }}>
                            <span style={{ fontSize: "11.5px", fontWeight: "700", color: "#047857", textTransform: "uppercase" }}>NET TAKE HOME SALARY</span>
                            <div className="mono" style={{ fontSize: "28px", fontWeight: "800", color: "#047857" }}>
                              ₹ {netSalary.toLocaleString("en-IN")}.00
                            </div>
                            <span style={{ fontSize: "11px", color: "#059669" }}>✓ Ready for payroll generation</span>
                          </div>

                        </div>

                        {/* Save Actions Bar */}
                        <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                          <button
                            type="button"
                            className="btn btn-ghost"
                            style={{ width: "auto" }}
                            onClick={() => setProfileTab("resume")}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ width: "auto", opacity: isSalaryStructureValid ? 1 : 0.5, cursor: isSalaryStructureValid ? "pointer" : "not-allowed" }}
                            disabled={!isSalaryStructureValid}
                            onClick={() => alert(`Salary structure for ${profileData.name} saved successfully!`)}
                          >
                            ✓ Save Salary Structure
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* SUB-TAB 4: SECURITY */}
                  {profileTab === "security" && (
                    <div className="card" style={{ padding: "28px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1E293B", marginBottom: "16px" }}>
                        Security & Password Settings
                      </h3>
                      <div className="field" style={{ maxWidth: "400px" }}>
                        <label>Current Auto-Generated Password</label>
                        <input type="text" value={autoPassword} readOnly style={{ background: "#F1F5F9", fontWeight: 700 }} />
                      </div>
                      <button className="btn btn-primary" style={{ width: "auto" }} onClick={() => generateRandomPassword()}>
                        ⚡ Regenerate Demo Password
                      </button>
                    </div>
                  )}

                </section>
              )}

              {/* PAGE: ATTENDANCE */}
              {activePage === "attendance" && (
                <section className="page active" id="page-attendance">
                  <AttendanceView />
                </section>
              )}

              {/* PAGE: LEAVE (FEATURING AI DAYFLOW ASSISTANT MATCHING IMAGE 1) */}
              {activePage === "leave" && (
                <section className="page active" id="page-leave">
                  <div className="page-head">
                    <div><div className="eyebrow">Time Off & AI Assistant</div><h1>Leave Requests & Smart Assistant</h1></div>
                  </div>
                  
                  <div className="grid grid-2" style={{ gap: "24px", alignItems: "start" }}>
                    
                    {/* LEFT COLUMN: DAYFLOW ASSISTANT CONVERSATIONAL WIDGET (EXACT IMAGE 1) */}
                    <div className="card" style={{ padding: "0", borderRadius: "16px", border: "1px solid #E2E8F0", overflow: "hidden", background: "#FFFFFF", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}>
                      
                      {/* Assistant Header */}
                      <div style={{ padding: "16px 20px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#582C83", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px" }}>
                          <img src="/logo/dayflow-logo-dark-bg.svg" alt="Dayflow Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#1E1B4B", margin: 0 }}>Dayflow Assistant</h3>
                          <div style={{ fontSize: "12px", color: "#059669", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px", marginTop: "1px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }}></span>
                            Reads your leave balance & team calendar
                          </div>
                        </div>
                      </div>

                      {/* Chat Messages Body Area */}
                      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px", background: "#FAF8FC", minHeight: "420px", maxHeight: "560px", overflowY: "auto" }}>
                        
                        {chatMessages.map((msg) => (
                          <React.Fragment key={msg.id}>
                            {msg.sender === "user" ? (
                              /* Employee Message Bubble (Right) */
                              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px" }}>
                                <div style={{ background: "#582C83", color: "#FFFFFF", padding: "12px 18px", borderRadius: "16px 16px 4px 16px", fontSize: "14px", fontWeight: "600", boxShadow: "0 2px 4px rgba(88,44,131,0.15)" }}>
                                  {msg.text}
                                </div>
                                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#4C1D95", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "800" }}>
                                  NI
                                </div>
                              </div>
                            ) : (
                              /* Assistant Response Bubble (Left) */
                              <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "92%" }}>
                                
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#582C83", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px", flexShrink: 0 }}>
                                    <img src="/logo/dayflow-logo-dark-bg.svg" alt="Dayflow Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                  </div>
                                  <div style={{ background: "#F5EFFE", color: "#1E1B4B", padding: "12px 16px", borderRadius: "4px 16px 16px 16px", fontSize: "14px", fontWeight: "600" }}>
                                    {msg.text}
                                  </div>
                                </div>

                                {msg.card && (
                                  /* Inner Structured Verification Card */
                                  <div style={{ marginLeft: "36px", background: "#FFFFFF", borderRadius: "12px", border: "1px solid #E9D5FF", overflow: "hidden", boxShadow: "0 4px 12px rgba(107,33,168,0.05)" }}>
                                    
                                    <div style={{ padding: "14px 16px", borderBottom: "1px solid #F3E8FF", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                      <span style={{ color: "#059669", fontWeight: "800", fontSize: "14px" }}>✓</span>
                                      <div>
                                        <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#64748B" }}>Leave balance</div>
                                        <div style={{ fontSize: "13.5px", fontWeight: "800", color: "#0F172A" }}>4 paid leaves remaining this quarter</div>
                                      </div>
                                    </div>

                                    <div style={{ padding: "14px 16px", borderBottom: "1px solid #F3E8FF", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                      <span style={{ color: "#059669", fontWeight: "800", fontSize: "14px" }}>✓</span>
                                      <div>
                                        <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#64748B" }}>Calendar check</div>
                                        <div style={{ fontSize: "13.5px", fontWeight: "800", color: "#0F172A" }}>Tomorrow is a working day, no holiday</div>
                                      </div>
                                    </div>

                                    <div style={{ padding: "14px 16px", borderBottom: "1px solid #F3E8FF", display: "flex", alignItems: "flex-start", gap: "10px", background: "#FFFBEB" }}>
                                      <span style={{ color: "#D97706", fontWeight: "800", fontSize: "14px" }}>⚠️</span>
                                      <div>
                                        <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#B45309" }}>Team availability</div>
                                        <div style={{ fontSize: "13.5px", fontWeight: "800", color: "#92400E" }}>2 of 8 teammates already on leave</div>
                                      </div>
                                    </div>

                                    {/* Interactive Selection Bar */}
                                    <div style={{ padding: "16px", background: "#FDF4FF" }}>
                                      <div style={{ fontSize: "14px", fontWeight: "800", color: "#1E1B4B", marginBottom: "12px" }}>
                                        Would you like to submit this as Paid Leave?
                                      </div>

                                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                                        {(["Paid Leave", "Sick Leave", "Unpaid Leave"] as const).map((t) => (
                                          <button
                                            key={t}
                                            type="button"
                                            onClick={() => setAiLeaveTypeSelect(t)}
                                            style={{
                                              padding: "8px 16px",
                                              borderRadius: "20px",
                                              fontSize: "12.5px",
                                              fontWeight: "700",
                                              border: aiLeaveTypeSelect === t ? "2px solid #582C83" : "1px solid #CBD5E1",
                                              background: aiLeaveTypeSelect === t ? "#F3E8FF" : "#FFFFFF",
                                              color: aiLeaveTypeSelect === t ? "#582C83" : "#475569",
                                              cursor: "pointer"
                                            }}
                                          >
                                            {t}
                                          </button>
                                        ))}
                                      </div>

                                      {/* Doctor Cert Upload if Sick Leave selected */}
                                      {aiLeaveTypeSelect === "Sick Leave" && (
                                        <div style={{ background: "#FFFFFF", padding: "12px", borderRadius: "10px", border: "1.5px dashed #C084FC", marginBottom: "14px" }}>
                                          <label style={{ fontSize: "12px", fontWeight: "700", color: "#7E22CE" }}>🩺 Upload Doctor / Medical Certificate *</label>
                                          <input
                                            type="file"
                                            accept=".pdf,image/*"
                                            onChange={(e) => e.target.files?.[0] && setAiDocCertName(e.target.files[0].name)}
                                            style={{ marginTop: "6px", fontSize: "11.5px", width: "100%" }}
                                          />
                                        </div>
                                      )}

                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (aiLeaveTypeSelect === "Sick Leave" && !aiDocCertName) {
                                            alert("Please attach a doctor note for Sick Leave.");
                                            return;
                                          }
                                          setAiLeaveSubmitted(true);
                                          // Push to leave history & approvals
                                          const newApp = {
                                            id: Date.now().toString(),
                                            initials: "NI",
                                            name: "Nupur Iyer",
                                            type: aiLeaveTypeSelect,
                                            dates: "21 Aug",
                                            remarks: `Requested via AI Assistant${aiDocCertName ? ` [📎 Doctor Cert: ${aiDocCertName}]` : ""}`,
                                            status: "Pending",
                                            resolved: false,
                                            certificate: aiDocCertName
                                          };
                                          setApprovals([newApp, ...approvals]);
                                        }}
                                        style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: "8px",
                                          padding: "10px 20px",
                                          borderRadius: "10px",
                                          background: "#582C83",
                                          color: "#FFFFFF",
                                          fontWeight: "800",
                                          fontSize: "13px",
                                          border: "none",
                                          cursor: "pointer",
                                          boxShadow: "0 4px 10px rgba(88,44,131,0.25)"
                                        }}
                                      >
                                        <span>✈️</span> Submit Leave Request
                                      </button>
                                    </div>

                                  </div>
                                )}

                                {/* Green Confirmation Alert Banner */}
                                {aiLeaveSubmitted && msg.card && (
                                  <div style={{ marginLeft: "36px", background: "#ECFDF5", color: "#047857", padding: "12px 16px", borderRadius: "10px", border: "1.5px solid #A7F3D0", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span>✓</span> Sent to Rakesh Menon for approval. You'll be notified once reviewed.
                                  </div>
                                )}

                              </div>
                            )}
                          </React.Fragment>
                        ))}

                      </div>

                      {/* Bottom Chat Prompt Input Form */}
                      <form onSubmit={handleSendChatMessage} style={{ padding: "12px 16px", borderTop: "1px solid #F1F5F9", background: "#FFFFFF", display: "flex", alignItems: "center", gap: "10px" }}>
                        <input
                          type="text"
                          placeholder="Ask about leave, balance, or team availability..."
                          value={aiLeavePrompt}
                          onChange={(e) => setAiLeavePrompt(e.target.value)}
                          style={{ flex: 1, padding: "10px 16px", borderRadius: "24px", border: "1.5px solid #E2E8F0", fontSize: "13px", outline: "none" }}
                        />
                        <button
                          type="submit"
                          style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#582C83", color: "#FFFFFF", border: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", cursor: "pointer" }}
                        >
                          ✈️
                        </button>
                      </form>

                    </div>

                    {/* RIGHT COLUMN: REQUEST HISTORY */}
                    <div className="card" style={{ padding: "20px" }}>
                      <div className="card-head-row" style={{ marginBottom: "14px" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "700" }}>Request History</h3>
                      </div>
                      <table>
                        <thead><tr><th>Type</th><th>Dates</th><th>Days</th><th>Status</th></tr></thead>
                        <tbody>
                          {leaveHistory.map((item: any) => (
                            <tr key={item.id}>
                              <td style={{ fontWeight: 600 }}>{item.type}</td>
                              <td>{item.dates}</td>
                              <td className="mono">{item.days}</td>
                              <td><span className={`pill ${item.pill}`}>{item.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                </section>
              )}

              {/* PAGE: EMPLOYEE PERFORMANCE & EFFORT EVALUATION */}
              {activePage === "employee-performance" && (
                <section className="page active" id="page-employee-performance">
                  <div className="page-head">
                    <div>
                      <div className="eyebrow">Personal Performance & Growth</div>
                      <h1>My Performance & Work Effort Evaluation</h1>
                      <p className="desc" style={{ fontSize: "13.5px", color: "var(--ink-soft)", marginTop: "2px" }}>
                        Real-time analytics evaluated from your attendance consistency, project deliverables completed, logged effort hours, and quality ratings.
                      </p>
                    </div>
                    <button className="btn btn-ghost" style={{ width: "auto" }} onClick={() => alert("Downloading official Performance Evaluation Report (PDF)...")}>
                      📄 Download Performance Report
                    </button>
                  </div>

                  {/* OVERALL PERFORMANCE HERO CARD (HIGH CONTRAST & SHARP VISIBILITY) */}
                  <div style={{
                    padding: "26px",
                    marginBottom: "20px",
                    background: "#1E1B4B",
                    color: "#FFFFFF",
                    borderRadius: "16px",
                    border: "2px solid #4F46E5",
                    boxShadow: "0 10px 25px rgba(30, 27, 75, 0.3)"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: "800", color: "#A5B4FC", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                          OVERALL PERFORMANCE INDEX (Q2 EVALUATION)
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "8px" }}>
                          <span className="mono" style={{ fontSize: "44px", fontWeight: "900", color: "#FFFFFF", letterSpacing: "-1px" }}>
                            96.4%
                          </span>
                          <span style={{ fontSize: "13.5px", fontWeight: "800", color: "#059669", background: "#D1FAE5", padding: "6px 14px", borderRadius: "20px", border: "1.5px solid #10B981" }}>
                            🏆 Outstanding Top 5% Performer
                          </span>
                        </div>
                        <p style={{ fontSize: "14px", color: "#E0E7FF", marginTop: "10px", fontWeight: "500", maxWidth: "620px" }}>
                          You have exceeded all performance expectations with 98.2% attendance consistency and 100% on-time project completion!
                        </p>
                      </div>

                      <div style={{ background: "#312E81", padding: "18px 24px", borderRadius: "14px", border: "1.5px solid #6366F1", textAlign: "center", minWidth: "240px" }}>
                        <div style={{ fontSize: "11px", fontWeight: "800", color: "#C7D2FE", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          APPRAISAL RECOMMENDATION
                        </div>
                        <div style={{ fontSize: "20px", fontWeight: "900", color: "#FACC15", marginTop: "6px" }}>
                          + 20% Hike Recommended
                        </div>
                        <span style={{ fontSize: "12px", color: "#86EFAC", fontWeight: "700", marginTop: "4px", display: "block" }}>
                          HR Review Status: Approved ✓
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4 CORE METRIC PILLARS GRID */}
                  <div className="grid grid-4" style={{ gap: "16px", marginBottom: "24px" }}>
                    
                    {/* CARD 1: ATTENDANCE */}
                    <div className="card" style={{ padding: "20px", borderLeft: "4px solid #22C55E" }}>
                      <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#047857", textTransform: "uppercase" }}>ATTENDANCE & PUNCTUALITY</div>
                      <div className="mono" style={{ fontSize: "26px", fontWeight: "800", color: "#0F172A", margin: "6px 0 2px 0" }}>98.2%</div>
                      <div style={{ fontSize: "12px", color: "var(--ink-soft)", fontWeight: "600" }}>22 / 22 Days Present • 0 Late</div>
                      <div style={{ width: "100%", height: "6px", background: "#E2E8F0", borderRadius: "3px", overflow: "hidden", marginTop: "10px" }}>
                        <div style={{ width: "98.2%", height: "100%", background: "#22C55E" }}></div>
                      </div>
                    </div>

                    {/* CARD 2: PROJECT DELIVERABLES */}
                    <div className="card" style={{ padding: "20px", borderLeft: "4px solid #8B5CF6" }}>
                      <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#6D28D9", textTransform: "uppercase" }}>PROJECT DELIVERABLES</div>
                      <div className="mono" style={{ fontSize: "26px", fontWeight: "800", color: "#0F172A", margin: "6px 0 2px 0" }}>96.0%</div>
                      <div style={{ fontSize: "12px", color: "var(--ink-soft)", fontWeight: "600" }}>12 / 12 Sprint Tasks Delivered</div>
                      <div style={{ width: "100%", height: "6px", background: "#E2E8F0", borderRadius: "3px", overflow: "hidden", marginTop: "10px" }}>
                        <div style={{ width: "96%", height: "100%", background: "#8B5CF6" }}></div>
                      </div>
                    </div>

                    {/* CARD 3: EFFORT LOGGED */}
                    <div className="card" style={{ padding: "20px", borderLeft: "4px solid #0D9488" }}>
                      <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#0F766E", textTransform: "uppercase" }}>WORK EFFORT LOGGED</div>
                      <div className="mono" style={{ fontSize: "26px", fontWeight: "800", color: "#0F172A", margin: "6px 0 2px 0" }}>178 hrs</div>
                      <div style={{ fontSize: "12px", color: "var(--ink-soft)", fontWeight: "600" }}>8.5 hrs Daily Avg Effort</div>
                      <div style={{ width: "100%", height: "6px", background: "#E2E8F0", borderRadius: "3px", overflow: "hidden", marginTop: "10px" }}>
                        <div style={{ width: "94%", height: "100%", background: "#0D9488" }}></div>
                      </div>
                    </div>

                    {/* CARD 4: QUALITY SCORE */}
                    <div className="card" style={{ padding: "20px", borderLeft: "4px solid #D97706" }}>
                      <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#B45309", textTransform: "uppercase" }}>QUALITY & PEER REVIEW</div>
                      <div className="mono" style={{ fontSize: "26px", fontWeight: "800", color: "#0F172A", margin: "6px 0 2px 0" }}>4.9 ⭐</div>
                      <div style={{ fontSize: "12px", color: "var(--ink-soft)", fontWeight: "600" }}>100% Peer Satisfaction</div>
                      <div style={{ width: "100%", height: "6px", background: "#E2E8F0", borderRadius: "3px", overflow: "hidden", marginTop: "10px" }}>
                        <div style={{ width: "98%", height: "100%", background: "#D97706" }}></div>
                      </div>
                    </div>

                  </div>

                  {/* PROJECT EFFORT & DELIVERABLES BREAKDOWN TABLE */}
                  <div className="card" style={{ padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                          Completed Projects & Effort Logged
                        </h3>
                        <p style={{ fontSize: "12.5px", color: "var(--ink-soft)", margin: "2px 0 0 0" }}>
                          Detailed breakdown of your effort contribution and deliverable status.
                        </p>
                      </div>
                      <span style={{ fontSize: "12.5px", fontWeight: "600", color: "var(--teal)" }}>
                        3 Active Key Projects Evaluated
                      </span>
                    </div>

                    <table>
                      <thead>
                        <tr>
                          <th>Project Name</th>
                          <th>Deliverables & Milestone</th>
                          <th>Logged Effort</th>
                          <th>Quality Score</th>
                          <th>Delivery Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: "700", color: "#0F172A" }}>
                            Dayflow v2.0 UI & Design System
                          </td>
                          <td style={{ fontSize: "13px", color: "#475569" }}>
                            Figma UI Tokens, Wireframes & Component Specs
                          </td>
                          <td className="mono" style={{ fontWeight: "700" }}>64 Hours</td>
                          <td className="mono" style={{ fontWeight: "700", color: "#D97706" }}>4.9 ⭐</td>
                          <td>
                            <span style={{ fontSize: "11.5px", fontWeight: "700", background: "#DCFCE7", color: "#15803D", padding: "3px 10px", borderRadius: "12px" }}>
                              🟢 Delivered Ahead of Schedule
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td style={{ fontWeight: "700", color: "#0F172A" }}>
                            Employee Leave & AI Assistant Interface
                          </td>
                          <td style={{ fontSize: "13px", color: "#475569" }}>
                            Conversational AI Leave Widget & Verification System
                          </td>
                          <td className="mono" style={{ fontWeight: "700" }}>48 Hours</td>
                          <td className="mono" style={{ fontWeight: "700", color: "#D97706" }}>4.8 ⭐</td>
                          <td>
                            <span style={{ fontSize: "11.5px", fontWeight: "700", background: "#DCFCE7", color: "#15803D", padding: "3px 10px", borderRadius: "12px" }}>
                              🟢 Delivered On-Time
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td style={{ fontWeight: "700", color: "#0F172A" }}>
                            HR Console & Salary Calculator Engine
                          </td>
                          <td style={{ fontSize: "13px", color: "#475569" }}>
                            Monthly Wage Calculator, PF & Tax Deductions
                          </td>
                          <td className="mono" style={{ fontWeight: "700" }}>52 Hours</td>
                          <td className="mono" style={{ fontWeight: "700", color: "#D97706" }}>5.0 ⭐</td>
                          <td>
                            <span style={{ fontSize: "11.5px", fontWeight: "700", background: "#DCFCE7", color: "#15803D", padding: "3px 10px", borderRadius: "12px" }}>
                              🟢 Delivered On-Time
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>

                </section>
              )}

              {/* PAGE: PAYROLL */}
              {activePage === "payroll" && (
                <section className="page active" id="page-payroll">
                  
                  {/* EMPLOYEE MODE (READ-ONLY PAYSLIP) */}
                  {currentRole === "employee" ? (
                    <>
                      <div className="page-head">
                        <div>
                          <div className="eyebrow">Read-only</div>
                          <h1>My Payslips & Compensation</h1>
                        </div>
                        <span className="pill pill-gray">Next payout • 01 Sep 2026</span>
                      </div>
                      <div className="grid grid-3">
                        <div className="card">
                          <div className="card-head-row">
                            <h3>July 2026 Payslip</h3>
                            <button className="link-btn" onClick={() => alert("Downloading PDF Payslip...")}>Download PDF</button>
                          </div>
                          <div className="payslip-row"><span>Basic Salary</span><span className="amt">₹ 25,000.00</span></div>
                          <div className="payslip-row"><span>HRA (50% Basic)</span><span className="amt">₹ 12,500.00</span></div>
                          <div className="payslip-row"><span>Special & Standard Allowances</span><span className="amt">₹ 12,500.00</span></div>
                          <div className="payslip-row"><span>Employee PF (12%)</span><span className="amt" style={{ color: "var(--rose)" }}>- ₹ 3,000.00</span></div>
                          <div className="payslip-row"><span>Professional Tax</span><span className="amt" style={{ color: "var(--rose)" }}>- ₹ 200.00</span></div>
                          <div className="payslip-row" style={{ fontWeight: 700, fontSize: "14px", borderTop: "1.5px solid var(--line)", paddingTop: "10px", marginTop: "6px" }}>
                            <span>Net Take-Home Pay</span>
                            <span className="amt" style={{ color: "var(--teal)" }}>₹ 46,800.00</span>
                          </div>
                        </div>

                        <div className="card stat-card">
                          <div className="stat-label">Annual Gross CTC</div>
                          <div className="stat-num mono" style={{ color: "var(--teal)" }}>₹ 6,00,000</div>
                          <div className="stat-trend trend-up" style={{ width: "fit-content", marginTop: "8px" }}>↑ 12% Annual Increment</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* HR & ADMIN MANAGEMENT CONSOLE MODE */
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      
                      {/* HR Page Header */}
                      <div className="page-head" style={{ marginBottom: 0 }}>
                        <div>
                          <div className="eyebrow">HR Operations</div>
                          <h1>All Employees Payroll Console</h1>
                          <p style={{ fontSize: "13px", color: "var(--ink-soft)", margin: "2px 0 0 0" }}>
                            View, generate, and edit monthly salary payslips for all team members.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ width: "auto", padding: "8px 18px", fontSize: "13px" }}
                          onClick={() => {
                            setGenSelectedEmpId(employeePayrolls[0].id);
                            setGenGrossWage(50000);
                            setIsGeneratePayslipOpen(true);
                          }}
                        >
                          + Generate Payslip
                        </button>
                      </div>

                      {/* Payroll Summary Stat Cards */}
                      <div className="grid grid-3" style={{ gap: "16px" }}>
                        <div className="card" style={{ padding: "18px 22px", borderLeft: "4px solid var(--primary)" }}>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>TOTAL MONTHLY PAYROLL</span>
                          <div className="mono" style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", marginTop: "4px" }}>
                            ₹ {employeePayrolls.reduce((sum, e) => sum + e.grossWage, 0).toLocaleString("en-IN")}
                          </div>
                          <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>Monthly company liability</span>
                        </div>

                        <div className="card" style={{ padding: "18px 22px", borderLeft: "4px solid var(--teal)" }}>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>TOTAL EMPLOYEES PROCESSED</span>
                          <div className="mono" style={{ fontSize: "22px", fontWeight: "800", color: "var(--teal)", marginTop: "4px" }}>
                            {employeePayrolls.length} / {employeePayrolls.length}
                          </div>
                          <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>100% Payroll generated</span>
                        </div>

                        <div className="card" style={{ padding: "18px 22px", borderLeft: "4px solid #2563EB" }}>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>NET PAY DISBURSED</span>
                          <div className="mono" style={{ fontSize: "22px", fontWeight: "800", color: "#2563EB", marginTop: "4px" }}>
                            ₹ {employeePayrolls.reduce((sum, e) => sum + e.netPay, 0).toLocaleString("en-IN")}
                          </div>
                          <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>Total net take-home sum</span>
                        </div>
                      </div>

                      {/* All Employees Payroll Directory Table */}
                      <div className="card" style={{ padding: "24px" }}>
                        
                        {/* Table Search & Filter Bar */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                          <div style={{ position: "relative", width: "300px" }}>
                            <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "var(--ink-soft)" }}>🔍</span>
                            <input
                              type="text"
                              placeholder="Search employee or code..."
                              value={payrollSearch}
                              onChange={(e) => setPayrollSearch(e.target.value)}
                              style={{ width: "100%", padding: "7px 10px 7px 30px", borderRadius: "8px", border: "1.5px solid var(--line)", fontSize: "13px" }}
                            />
                          </div>
                          <span style={{ fontSize: "12.5px", fontWeight: "600", color: "var(--ink-soft)" }}>
                            Showing {employeePayrolls.filter(e => e.name.toLowerCase().includes(payrollSearch.toLowerCase()) || e.code.toLowerCase().includes(payrollSearch.toLowerCase())).length} Employees
                          </span>
                        </div>

                        <table>
                          <thead>
                            <tr>
                              <th>Employee</th>
                              <th>Department</th>
                              <th>Gross Wage</th>
                              <th>PF & Tax Deductions</th>
                              <th>Net Take-Home Pay</th>
                              <th style={{ textAlign: "right" }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {employeePayrolls
                              .filter(e => e.name.toLowerCase().includes(payrollSearch.toLowerCase()) || e.code.toLowerCase().includes(payrollSearch.toLowerCase()))
                              .map((emp) => (
                                <tr key={emp.id}>
                                  <td>
                                    <div className="cell-person">
                                      <div className="mini-avatar" style={{ background: emp.avatarBg }}>
                                        {emp.initials}
                                      </div>
                                      <div>
                                        <div className="p-name">{emp.name}</div>
                                        <div className="p-sub mono">{emp.code}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{emp.dept}</td>
                                  <td className="mono" style={{ fontWeight: "700" }}>₹ {emp.grossWage.toLocaleString("en-IN")}.00</td>
                                  <td className="mono" style={{ color: "var(--rose)", fontWeight: "600" }}>- ₹ {(emp.pf + emp.tax).toLocaleString("en-IN")}.00</td>
                                  <td className="mono" style={{ fontWeight: "800", color: "var(--teal)", fontSize: "14px" }}>
                                    ₹ {emp.netPay.toLocaleString("en-IN")}.00
                                  </td>
                                  <td style={{ textAlign: "right" }}>
                                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                                      <button
                                        type="button"
                                        className="btn btn-ghost"
                                        style={{ padding: "4px 10px", fontSize: "11.5px" }}
                                        onClick={() => {
                                          setEditingPayrollEmp(emp);
                                          setEditGrossWage(emp.grossWage);
                                          setEditPfAmount(emp.pf);
                                          setEditTaxAmount(emp.tax);
                                        }}
                                        title="Edit Salary & Deductions"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-ghost"
                                        style={{ padding: "4px 10px", fontSize: "11.5px" }}
                                        onClick={() => alert(`Downloading PDF Payslip for ${emp.name} (${emp.code})...`)}
                                        title="Download PDF"
                                      >
                                        📄 PDF
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>

                      </div>

                    </div>
                  )}

                </section>
              )}

              {/* PAGE: WORK OVERVIEW (HR CONSOLE) */}
              {activePage === "work-overview" && (
                <section className="page active" id="page-work-overview">
                  <div className="page-head">
                    <div>
                      <div className="eyebrow">HR Console Operations</div>
                      <h1>All Employees Work & Activity Overview</h1>
                      <p className="desc" style={{ fontSize: "13.5px", color: "var(--ink-soft)", marginTop: "2px" }}>
                        Real-time tracking of employee check-in/out times, logged work activities, and productivity. HR can edit any record live.
                      </p>
                    </div>
                  </div>

                  {/* STAT CARDS */}
                  <div className="grid grid-2" style={{ gap: "16px", marginBottom: "20px" }}>
                    <div className="card" style={{ padding: "18px 22px", borderLeft: "4px solid #22C55E" }}>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#047857", textTransform: "uppercase" }}>WORKING NOW</span>
                      <div className="mono" style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", marginTop: "4px" }}>
                        {workOverviewRecords.filter(r => r.status === "Working").length} Staff Active
                      </div>
                      <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>Currently clocked in & logged</span>
                    </div>

                    <div className="card" style={{ padding: "18px 22px", borderLeft: "4px solid var(--primary)" }}>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>TOTAL LOGGED HOURS</span>
                      <div className="mono" style={{ fontSize: "22px", fontWeight: "800", color: "var(--primary)", marginTop: "4px" }}>
                        58.5 Hours Today
                      </div>
                      <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>Across all active team members</span>
                    </div>
                  </div>

                  {/* ALL EMPLOYEES WORK ACTIVITY TABLE */}
                  <div className="card" style={{ padding: "24px" }}>
                    
                    {/* Search Bar */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <div style={{ position: "relative", width: "320px" }}>
                        <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "var(--ink-soft)" }}>🔍</span>
                        <input
                          type="text"
                          placeholder="Search employee or task activity..."
                          value={workOverviewSearch}
                          onChange={(e) => setWorkOverviewSearch(e.target.value)}
                          style={{ width: "100%", padding: "7px 10px 7px 30px", borderRadius: "8px", border: "1.5px solid var(--line)", fontSize: "13px" }}
                        />
                      </div>
                      <span style={{ fontSize: "12.5px", fontWeight: "600", color: "var(--ink-soft)" }}>
                        Showing {workOverviewRecords.filter(r => r.name.toLowerCase().includes(workOverviewSearch.toLowerCase()) || r.activity.toLowerCase().includes(workOverviewSearch.toLowerCase())).length} Active Records
                      </span>
                    </div>

                    <table>
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Department</th>
                          <th>Clock In</th>
                          <th>Clock Out</th>
                          <th>Work Activity & Task Logged</th>
                          <th>Duration</th>
                          <th>Status</th>
                          <th style={{ textAlign: "right" }}>HR Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workOverviewRecords
                          .filter(r => r.name.toLowerCase().includes(workOverviewSearch.toLowerCase()) || r.activity.toLowerCase().includes(workOverviewSearch.toLowerCase()))
                          .map((rec) => (
                            <tr key={rec.id}>
                              <td>
                                <div className="cell-person">
                                  <div className="mini-avatar" style={{ background: rec.avatarBg }}>
                                    {rec.initials}
                                  </div>
                                  <div>
                                    <div className="p-name">{rec.name}</div>
                                    <div className="p-sub mono">{rec.code}</div>
                                  </div>
                                </div>
                              </td>
                              <td>{rec.dept}</td>
                              <td className="mono" style={{ fontWeight: "700" }}>{rec.clockIn}</td>
                              <td className="mono" style={{ fontWeight: "700", color: rec.status === "Working" ? "var(--teal)" : "inherit" }}>
                                {rec.clockOut}
                              </td>
                              <td>
                                <div style={{ fontSize: "13px", fontWeight: "600", color: "#0F172A", maxWidth: "340px", whiteSpace: "normal" }}>
                                  {rec.activity}
                                </div>
                              </td>
                              <td className="mono" style={{ fontWeight: "700" }}>{rec.hours}</td>
                              <td>
                                <span className={`pill ${rec.status === "Working" ? "pill-teal" : rec.status === "On Break" ? "pill-amber" : "pill-gray"}`}>
                                  {rec.status}
                                </span>
                              </td>
                              <td style={{ textAlign: "right" }}>
                                <button
                                  type="button"
                                  className="btn btn-ghost"
                                  style={{ padding: "4px 12px", fontSize: "11.5px", width: "auto" }}
                                  onClick={() => {
                                    setEditingWorkRecord(rec);
                                    setEditWorkClockIn(rec.clockIn);
                                    setEditWorkClockOut(rec.clockOut);
                                    setEditWorkActivity(rec.activity);
                                    setEditWorkStatus(rec.status);
                                  }}
                                  title="Edit Employee Attendance & Activity"
                                >
                                  Edit Record
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>

                  </div>

                </section>
              )}

              {/* PAGE: CALENDAR ATTENDANCE LOG EDITOR */}
              {activePage === "calendar-editor" && (
                <section className="page active" id="page-calendar-editor">
                  <div className="page-head">
                    <div>
                      <div className="eyebrow">HR Historical Attendance Audit</div>
                      <h1>Monthly Attendance & Log Correction Calendar</h1>
                      <p className="desc" style={{ fontSize: "13.5px", color: "var(--ink-soft)", marginTop: "2px" }}>
                        View monthly attendance matrix for any employee. HR can click any date (including 1 month ago) to retroactively edit clock-in/out times, activities, or missing records.
                      </p>
                    </div>
                  </div>

                  {/* CONTROLS BAR */}
                  <div className="card" style={{ padding: "16px 20px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                      
                      {/* Employee Dropdown */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "12.5px", fontWeight: "700", color: "var(--ink-soft)" }}>Employee:</span>
                        <select
                          value={calSelectedEmpId}
                          onChange={(e) => setCalSelectedEmpId(e.target.value)}
                          style={{ padding: "8px 12px", borderRadius: "8px", border: "1.5px solid var(--line)", fontSize: "13px", fontWeight: "700", background: "#F8FAFC" }}
                        >
                          {workOverviewRecords.map(e => (
                            <option key={e.id} value={e.id}>{e.name} ({e.code}) — {e.dept}</option>
                          ))}
                        </select>
                      </div>

                      {/* Month Dropdown */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "12.5px", fontWeight: "700", color: "var(--ink-soft)" }}>Month / Year:</span>
                        <select
                          value={calSelectedMonth}
                          onChange={(e) => setCalSelectedMonth(e.target.value)}
                          style={{ padding: "8px 12px", borderRadius: "8px", border: "1.5px solid var(--line)", fontSize: "13px", fontWeight: "700", background: "#F8FAFC" }}
                        >
                          <option value="July 2026">July 2026 (1 Month Ago — Historical)</option>
                          <option value="August 2026">August 2026 (Current Month)</option>
                          <option value="June 2026">June 2026 (2 Months Ago)</option>
                        </select>
                      </div>

                    </div>

                    {/* Color Legend */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "11.5px", fontWeight: "700" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><i style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22C55E" }}></i> Present</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><i style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#EF4444" }}></i> Missing Clock-In</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><i style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#F59E0B" }}></i> On Leave</span>
                    </div>
                  </div>

                  {/* CALENDAR GRID MATRIX */}
                  <div className="card" style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                        {workOverviewRecords.find(e => e.id === calSelectedEmpId)?.name} — {calSelectedMonth} Log Matrix
                      </h3>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--teal)" }}>
                        💡 Click any day box to edit or add missing clock-in records
                      </span>
                    </div>

                    {/* 31-Day Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
                      {monthCalendarDays.map((d) => {
                        const isPresent = d.status === "Present";
                        const isMissing = d.status === "Missing";
                        const isLeave = d.status === "Leave";
                        const isWeekend = d.status === "Weekend";

                        return (
                          <div
                            key={d.day}
                            onClick={() => {
                              if (isWeekend) return;
                              setEditingCalendarDay(d);
                              setRetroClockIn(d.clockIn === "—" ? "09:00 AM" : d.clockIn);
                              setRetroClockOut(d.clockOut === "—" ? "06:30 PM" : d.clockOut);
                              setRetroStatus(isMissing ? "Present" : d.status);
                              setRetroActivity(d.activity.replace("⚠️ Forgot to Clock In ", ""));
                            }}
                            style={{
                              padding: "12px",
                              borderRadius: "10px",
                              border: isMissing
                                ? "2px solid #EF4444"
                                : isPresent
                                ? "1.5px solid #A7F3D0"
                                : isLeave
                                ? "1.5px solid #FDE68A"
                                : "1px solid #E2E8F0",
                              background: isMissing
                                ? "#FEF2F2"
                                : isPresent
                                ? "#F0FDF4"
                                : isLeave
                                ? "#FFFBEB"
                                : "#F8FAFC",
                              cursor: isWeekend ? "default" : "pointer",
                              transition: ".15s transform",
                              opacity: isWeekend ? 0.6 : 1,
                              position: "relative"
                            }}
                            onMouseEnter={(e) => !isWeekend && (e.currentTarget.style.transform = "translateY(-2px)")}
                            onMouseLeave={(e) => !isWeekend && (e.currentTarget.style.transform = "translateY(0)")}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                              <span style={{ fontSize: "13px", fontWeight: "800", color: "#0F172A" }}>{d.day} ({d.weekday})</span>
                              <span
                                style={{
                                  fontSize: "10px",
                                  fontWeight: "700",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  background: isMissing ? "#FEE2E2" : isPresent ? "#DCFCE7" : isLeave ? "#FEF3C7" : "#E2E8F0",
                                  color: isMissing ? "#B91C1C" : isPresent ? "#15803D" : isLeave ? "#B45309" : "#64748B"
                                }}
                              >
                                {d.status}
                              </span>
                            </div>

                            <div className="mono" style={{ fontSize: "11.5px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                              {d.clockIn} → {d.clockOut}
                            </div>

                            <div style={{ fontSize: "11px", color: "var(--ink-soft)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={d.activity}>
                              {d.activity}
                            </div>

                            {!isWeekend && (
                              <div style={{ marginTop: "8px", textAlign: "right" }}>
                                <span style={{ fontSize: "10.5px", fontWeight: "700", color: "var(--primary)", background: "#EFF6FF", padding: "2px 6px", borderRadius: "4px" }}>
                                  Edit Log
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                  </div>

                </section>
              )}

              {/* PAGE: PROJECT PERFORMANCE & APPRAISAL RECOMMENDATIONS */}
              {activePage === "performance-appraisal" && (
                <section className="page active" id="page-performance-appraisal">
                  <div className="page-head">
                    <div>
                      <div className="eyebrow">HR Intelligence & Growth</div>
                      <h1>Project Performance & Appraisal Recommendation Engine</h1>
                      <p className="desc" style={{ fontSize: "13.5px", color: "var(--ink-soft)", marginTop: "2px" }}>
                        Calculates employee productivity based on project completion rate, hours logged, and quality scores. Suggests automated appraisal hikes with one-click salary updates.
                      </p>
                    </div>
                  </div>

                  {/* SUMMARY STAT CARDS */}
                  <div className="grid grid-3" style={{ gap: "16px", marginBottom: "20px" }}>
                    <div className="card" style={{ padding: "18px 22px", borderLeft: "4px solid #8B5CF6" }}>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#6D28D9", textTransform: "uppercase" }}>AVG PERFORMANCE INDEX</span>
                      <div className="mono" style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", marginTop: "4px" }}>
                        92.4% Team Excellence
                      </div>
                      <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>Based on Q2 project delivery data</span>
                    </div>

                    <div className="card" style={{ padding: "18px 22px", borderLeft: "4px solid #22C55E" }}>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#047857", textTransform: "uppercase" }}>PROMOTION & HIKE QUALIFIED</span>
                      <div className="mono" style={{ fontSize: "22px", fontWeight: "800", color: "#15803D", marginTop: "4px" }}>
                        6 / 8 Staff Recommended
                      </div>
                      <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>Met high productivity thresholds</span>
                    </div>

                    <div className="card" style={{ padding: "18px 22px", borderLeft: "4px solid var(--teal)" }}>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#0F766E", textTransform: "uppercase" }}>ESTIMATED ANNUAL HIKE IMPACT</span>
                      <div className="mono" style={{ fontSize: "22px", fontWeight: "800", color: "var(--teal)", marginTop: "4px" }}>
                        + ₹ 1,42,000 / Year
                      </div>
                      <span style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px", display: "block" }}>Payroll expansion budget</span>
                    </div>
                  </div>

                  {/* PERFORMANCE MATRIX TABLE */}
                  <div className="card" style={{ padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                        All Employees Project Performance & AI Appraisal Matrix
                      </h3>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--ink-soft)" }}>
                        Showing 8 Active Employee Evaluations
                      </span>
                    </div>

                    <table>
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Project Deliverables & Completion</th>
                          <th>Work Hours</th>
                          <th>Quality Rating</th>
                          <th>Performance Index</th>
                          <th>AI Appraisal Recommendation</th>
                          <th style={{ textAlign: "right" }}>HR Appraisal Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {performanceMetrics.map((emp) => (
                          <tr key={emp.id}>
                            <td>
                              <div className="cell-person">
                                <div className="mini-avatar" style={{ background: emp.avatarBg }}>
                                  {emp.initials}
                                </div>
                                <div>
                                  <div className="p-name">{emp.name}</div>
                                  <div className="p-sub mono">{emp.code} • {emp.role}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#0F172A", maxWidth: "260px" }}>
                                {emp.projects}
                              </div>
                            </td>
                            <td className="mono" style={{ fontWeight: "700" }}>{emp.hours}</td>
                            <td className="mono" style={{ fontWeight: "700", color: "#D97706" }}>{emp.rating}</td>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span className="mono" style={{ fontWeight: "800", color: "#0F172A", fontSize: "13px" }}>{emp.score}%</span>
                                <div style={{ width: "60px", height: "6px", background: "#E2E8F0", borderRadius: "3px", overflow: "hidden" }}>
                                  <div style={{ width: `${emp.score}%`, height: "100%", background: emp.score > 92 ? "#22C55E" : "#3B82F6" }}></div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "12px", background: emp.score > 90 ? "#F5F3FF" : "#ECFDF5", color: emp.score > 90 ? "#6D28D9" : "#047857", border: `1px solid ${emp.score > 90 ? "#DDD6FE" : "#A7F3D0"}` }}>
                                {emp.status}
                              </span>
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <button
                                type="button"
                                className="btn btn-primary"
                                style={{ padding: "5px 12px", fontSize: "11.5px", width: "auto" }}
                                onClick={() => {
                                  setAppraisalTargetEmp(emp);
                                  setCustomHikePercent(emp.recommendedIncrement);
                                }}
                              >
                                ⚡ Trigger Appraisal
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>

                </section>
              )}

              {/* PAGE: ADMIN EMPLOYEES DIRECTORY */}
              {activePage === "admin" && (
                <section className="page active" id="page-admin">
                  <div className="page-head">
                    <div>
                      <div className="eyebrow">HR Console</div>
                      <h1>Employees Directory</h1>
                      <p className="desc" style={{ fontSize: "13.5px", color: "var(--ink-soft)", marginTop: "2px" }}>
                        Click any card to view detailed employee information in read-only mode.
                      </p>
                    </div>
                    <button className="btn btn-primary" style={{ width: "auto" }}>+ Add Employee</button>
                  </div>

                  {/* STAT SUMMARY COUNTERS */}
                  <div className="grid grid-4" style={{ marginBottom: "20px" }}>
                    <div className="card stat-card" style={{ cursor: "pointer" }} onClick={() => setDirectoryFilter("all")}>
                      <div className="stat-top"><span className="stat-label">Total Staff</span><div className="stat-icon" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div></div>
                      <div className="stat-num mono">128</div>
                    </div>
                    <div className="card stat-card" style={{ border: directoryFilter === "present" ? "2px solid #22C55E" : "1px solid var(--line)", cursor: "pointer" }} onClick={() => setDirectoryFilter("present")}>
                      <div className="stat-top"><span className="stat-label" style={{ color: "#047857", fontWeight: "700" }}>🟢 Present Today</span><div className="stat-icon" style={{ background: "#DCFCE7", color: "#15803D" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/></svg></div></div>
                      <div className="stat-num mono" style={{ color: "#15803D" }}>117</div>
                    </div>
                    <div className="card stat-card" style={{ border: directoryFilter === "absent" ? "2px solid #EF4444" : "1px solid var(--line)", cursor: "pointer" }} onClick={() => setDirectoryFilter("absent")}>
                      <div className="stat-top"><span className="stat-label" style={{ color: "#B91C1C", fontWeight: "700" }}>🔴 Absent / Leave</span><div className="stat-icon" style={{ background: "#FEE2E2", color: "#B91C1C" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v6l4 2"/><circle cx="12" cy="12" r="9"/></svg></div></div>
                      <div className="stat-num mono" style={{ color: "#B91C1C" }}>11</div>
                    </div>
                    <div className="card stat-card" style={{ cursor: "pointer" }} onClick={() => setActivePage("approvals")}>
                      <div className="stat-top"><span className="stat-label">Pending Approvals</span><div className="stat-icon" style={{ background: "var(--amber-soft)", color: "var(--amber)" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="17" rx="2"/></svg></div></div>
                      <div className="stat-num mono">3</div>
                    </div>
                  </div>

                  {/* FILTER & SEARCH BAR */}
                  <div className="card" style={{ padding: "14px 18px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <div style={{ position: "relative", minWidth: "260px" }}>
                        <input
                          type="text"
                          placeholder="Search employee name, ID, or dept..."
                          value={directorySearch}
                          onChange={(e) => setDirectorySearch(e.target.value)}
                          style={{ padding: "8px 12px 8px 34px", borderRadius: "20px", border: "1.5px solid var(--line)", fontSize: "13px", width: "100%" }}
                        />
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "14px", height: "14px", color: "var(--ink-soft)" }}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
                      </div>

                      {/* Filter Pills */}
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => setDirectoryFilter("all")}
                          style={{ border: "none", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: directoryFilter === "all" ? "var(--primary)" : "var(--bg)", color: directoryFilter === "all" ? "#fff" : "var(--ink-soft)" }}
                        >
                          All Employees
                        </button>
                        <button
                          onClick={() => setDirectoryFilter("present")}
                          style={{ border: "none", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: directoryFilter === "present" ? "#22C55E" : "#DCFCE7", color: directoryFilter === "present" ? "#fff" : "#15803D" }}
                        >
                          🟢 Present
                        </button>
                        <button
                          onClick={() => setDirectoryFilter("absent")}
                          style={{ border: "none", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: directoryFilter === "absent" ? "#EF4444" : "#FEE2E2", color: directoryFilter === "absent" ? "#fff" : "#B91C1C" }}
                        >
                          🔴 Absent / On Leave
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        onClick={() => setDirectoryViewMode("grid")}
                        style={{ border: "1px solid var(--line)", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: directoryViewMode === "grid" ? "var(--primary-soft)" : "#fff", color: directoryViewMode === "grid" ? "var(--primary)" : "var(--ink-soft)" }}
                      >
                        ▦ Cards Grid
                      </button>
                      <button
                        onClick={() => setDirectoryViewMode("table")}
                        style={{ border: "1px solid var(--line)", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", background: directoryViewMode === "table" ? "var(--primary-soft)" : "#fff", color: directoryViewMode === "table" ? "var(--primary)" : "var(--ink-soft)" }}
                      >
                        ☰ List View
                      </button>
                    </div>
                  </div>

                  {/* DIRECTORY GRID VIEW */}
                  {directoryViewMode === "grid" ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>
                      {employeeDirectory
                        .filter((emp) => {
                          const matchesFilter =
                            directoryFilter === "all"
                              ? true
                              : directoryFilter === "present"
                              ? emp.status === "present"
                              : emp.status !== "present";
                          const matchesSearch =
                            emp.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
                            emp.dept.toLowerCase().includes(directorySearch.toLowerCase()) ||
                            emp.code.toLowerCase().includes(directorySearch.toLowerCase());
                          return matchesFilter && matchesSearch;
                        })
                        .map((emp) => {
                          const isPresent = emp.status === "present";
                          return (
                            <div
                              key={emp.id}
                              className="card"
                              onClick={() => setSelectedViewEmp(emp)}
                              style={{
                                padding: "20px",
                                cursor: "pointer",
                                transition: ".2s transform, .2s box-shadow",
                                position: "relative",
                                background: isPresent
                                  ? "linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 65%)"
                                  : "linear-gradient(180deg, #FEF2F2 0%, #FFFFFF 65%)",
                                border: isPresent ? "2px solid #22C55E" : "2px solid #EF4444",
                                borderRadius: "14px",
                                boxShadow: isPresent
                                  ? "0 6px 16px -4px rgba(34, 197, 94, 0.2)"
                                  : "0 6px 16px -4px rgba(239, 68, 68, 0.2)",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                            >
                              {/* TOP RIGHT ATTENDANCE STATUS DOT / BADGE */}
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                                <span style={{ fontSize: "10.5px", fontWeight: "800", color: "#64748B", background: "rgba(255,255,255,0.8)", padding: "2px 8px", borderRadius: "6px", border: "1px solid var(--line)" }}>
                                  {emp.code}
                                </span>
                                <span
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: "800",
                                    padding: "3px 10px",
                                    borderRadius: "12px",
                                    background: isPresent ? "#DCFCE7" : "#FEE2E2",
                                    color: isPresent ? "#15803D" : "#B91C1C",
                                    border: `1px solid ${isPresent ? "#86EFAC" : "#FCA5A5"}`,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    boxShadow: isPresent ? "0 0 8px rgba(34, 197, 94, 0.3)" : "0 0 8px rgba(239, 68, 68, 0.3)"
                                  }}
                                >
                                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: isPresent ? "#22C55E" : "#EF4444" }}></span>
                                  {isPresent ? "Present" : emp.status === "leave" ? "On Leave" : "Absent"}
                                </span>
                              </div>

                              {/* EMPLOYEE AVATAR & BASIC DETAILS */}
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                <div
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "18px",
                                    background: emp.avatarBg,
                                    color: "#FFFFFF",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "22px",
                                    fontWeight: "800",
                                    fontFamily: "'Sora', sans-serif",
                                    marginBottom: "10px",
                                    border: `3px solid ${isPresent ? "#22C55E" : "#EF4444"}`,
                                    boxShadow: isPresent ? "0 0 12px rgba(34, 197, 94, 0.3)" : "0 0 12px rgba(239, 68, 68, 0.3)"
                                  }}
                                >
                                  {emp.initials}
                                </div>
                                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1E293B", margin: "0 0 2px 0" }}>{emp.name}</h3>
                                <div style={{ fontSize: "12.5px", fontWeight: "600", color: "var(--primary)" }}>{emp.role}</div>
                                <div style={{ fontSize: "11.5px", color: "var(--ink-soft)", marginTop: "2px" }}>{emp.dept}</div>
                              </div>

                              {/* WORK SUMMARY / FOOTER */}
                              <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: "11px", color: "var(--ink-soft)", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "190px" }}>
                                  {emp.workSummary}
                                </span>
                                <span style={{ fontSize: "11px", fontWeight: "700", color: isPresent ? "#059669" : "#DC2626" }}>
                                  View →
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    /* DIRECTORY TABLE VIEW */
                    <div className="card">
                      <table>
                        <thead><tr><th>Employee</th><th>Department</th><th>Role</th><th>Attendance Status</th><th>Action</th></tr></thead>
                        <tbody>
                          {employeeDirectory
                            .filter((emp) => {
                              const matchesFilter =
                                directoryFilter === "all"
                                  ? true
                                  : directoryFilter === "present"
                                  ? emp.status === "present"
                                  : emp.status !== "present";
                              const matchesSearch =
                                emp.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
                                emp.dept.toLowerCase().includes(directorySearch.toLowerCase()) ||
                                emp.code.toLowerCase().includes(directorySearch.toLowerCase());
                              return matchesFilter && matchesSearch;
                            })
                            .map((emp) => (
                              <tr key={emp.id} style={{ background: emp.status === "present" ? "rgba(34, 197, 94, 0.03)" : "rgba(239, 68, 68, 0.03)" }}>
                                <td>
                                  <div className="cell-person">
                                    <div className="mini-avatar" style={{ background: emp.avatarBg, color: "#fff", border: `2px solid ${emp.status === "present" ? "#22C55E" : "#EF4444"}` }}>
                                      {emp.initials}
                                    </div>
                                    <div>
                                      <div className="p-name">{emp.name}</div>
                                      <div className="p-sub mono">{emp.code}</div>
                                    </div>
                                  </div>
                                </td>
                                <td>{emp.dept}</td>
                                <td style={{ fontSize: "13px", fontWeight: "600", color: "var(--ink)" }}>{emp.role}</td>
                                <td>
                                  <span className={`pill ${emp.status === "present" ? "pill-teal" : "pill-rose"}`}>
                                    {emp.statusBadge}
                                  </span>
                                </td>
                                <td>
                                  <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: "11.5px", width: "auto" }} onClick={() => setSelectedViewEmp(emp)}>
                                    View Profile 👁️
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              )}

              {/* READ-ONLY EMPLOYEE INFORMATION MODAL POPUP */}
              {selectedViewEmp && (
                <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                  <div className="card" style={{ width: "100%", maxWidth: "540px", padding: "28px", borderRadius: "16px", background: "#FFFFFF", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", position: "relative" }}>
                    
                    {/* Read-Only Badge Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid var(--line)", paddingBottom: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "11.5px", fontWeight: "700", color: "#475569", background: "#F1F5F9", padding: "3px 10px", borderRadius: "12px", border: "1px solid #CBD5E1" }}>
                          👁️ View-Only Mode (Non-Editable)
                        </span>
                      </div>
                      <button onClick={() => setSelectedViewEmp(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "var(--ink-soft)" }}>✕</button>
                    </div>

                    {/* Employee Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "24px" }}>
                      <div style={{ width: "68px", height: "68px", borderRadius: "20px", background: selectedViewEmp.avatarBg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "800", fontFamily: "'Sora', sans-serif", border: `3px solid ${selectedViewEmp.status === "present" ? "#22C55E" : "#EF4444"}` }}>
                        {selectedViewEmp.initials}
                      </div>
                      <div>
                        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "var(--ink)", margin: 0 }}>{selectedViewEmp.name}</h2>
                        <div style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "2px", fontWeight: "500" }}>{selectedViewEmp.role} • {selectedViewEmp.dept}</div>
                        <div style={{ marginTop: "6px" }}>
                          <span style={{ fontSize: "11.5px", fontWeight: "700", padding: "3px 10px", borderRadius: "999px", background: selectedViewEmp.status === "present" ? "#DCFCE7" : "#FEE2E2", color: selectedViewEmp.status === "present" ? "#15803D" : "#B91C1C", border: `1px solid ${selectedViewEmp.status === "present" ? "#86EFAC" : "#FCA5A5"}` }}>
                            {selectedViewEmp.statusBadge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Key-Value Details Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", background: "#F8FAFC", padding: "18px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <div><label style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Employee Code</label><div style={{ fontSize: "13.5px", fontWeight: "700", color: "#0F172A" }}>{selectedViewEmp.code}</div></div>
                      <div><label style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Department</label><div style={{ fontSize: "13.5px", fontWeight: "600", color: "#0F172A" }}>{selectedViewEmp.dept}</div></div>
                      <div><label style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Email</label><div style={{ fontSize: "13px", fontWeight: "600", color: "#2563EB" }}>{selectedViewEmp.email}</div></div>
                      <div><label style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Phone</label><div style={{ fontSize: "13px", fontWeight: "600", color: "#0F172A" }}>{selectedViewEmp.phone}</div></div>
                      <div><label style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Date of Joining</label><div style={{ fontSize: "13px", fontWeight: "600", color: "#0F172A" }}>{selectedViewEmp.joiningDate}</div></div>
                      <div><label style={{ fontSize: "11px", fontWeight: "700", color: "#64748B", textTransform: "uppercase" }}>Reporting Manager</label><div style={{ fontSize: "13px", fontWeight: "600", color: "#0F172A" }}>{selectedViewEmp.manager}</div></div>
                    </div>

                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                      <button className="btn btn-primary" style={{ width: "auto", padding: "9px 24px" }} onClick={() => setSelectedViewEmp(null)}>
                        Close Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE: ADMIN APPROVALS (EXACT MATCH FOR USER'S IMAGE 2 "WHAT HR SEES") */}
              {activePage === "approvals" && (
                <section className="page active" id="page-approvals">
                  <div className="page-head">
                    <div>
                      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        🔔 WHAT HR SEES
                      </div>
                      <h1>Leave Approvals & Team Capacity</h1>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "780px" }}>
                    
                    {/* TOP CARD: WHAT HR SEES - NEW LEAVE REQUEST CARD (EXACT IMAGE 2) */}
                    <div className="card" style={{ padding: "0", borderRadius: "16px", border: "1.5px solid #E2E8F0", overflow: "hidden", background: "#FFFFFF", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}>
                      
                      {/* Card Header */}
                      <div style={{ padding: "14px 20px", background: "#FAF5FF", borderBottom: "1px solid #F3E8FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6B21A8", fontWeight: "800", fontSize: "14px" }}>
                          <span>🔔</span> New Leave Request
                        </div>
                        <span style={{ fontSize: "12px", color: "#94A3B8", fontWeight: "600" }}>Just now</span>
                      </div>

                      {/* Card Body */}
                      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                        
                        {/* Employee Avatar & Name */}
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#F3E8FF", color: "#6B21A8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "800" }}>
                            NI
                          </div>
                          <div>
                            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Nupur Iyer</h3>
                            <div style={{ fontSize: "12.5px", color: "#64748B", marginTop: "2px" }}>Product · DF-2310</div>
                          </div>
                        </div>

                        {/* 4-Grid Details Box */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #E2E8F0", borderRadius: "12px", overflow: "hidden" }}>
                          <div style={{ padding: "12px 16px", borderRight: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", background: "#FFFFFF" }}>
                            <div style={{ fontSize: "10.5px", fontWeight: "800", color: "#64748B", textTransform: "uppercase" }}>TYPE</div>
                            <div style={{ marginTop: "4px" }}>
                              <span style={{ fontSize: "12px", fontWeight: "700", background: "#FEF3C7", color: "#B45309", padding: "3px 10px", borderRadius: "12px" }}>
                                Paid Leave
                              </span>
                            </div>
                          </div>

                          <div style={{ padding: "12px 16px", borderBottom: "1px solid #E2E8F0", background: "#FFFFFF" }}>
                            <div style={{ fontSize: "10.5px", fontWeight: "800", color: "#64748B", textTransform: "uppercase" }}>DURATION</div>
                            <div style={{ fontSize: "13.5px", fontWeight: "800", color: "#0F172A", marginTop: "2px" }}>
                              1 day · Fri, 21 Aug
                            </div>
                          </div>

                          <div style={{ padding: "12px 16px", borderRight: "1px solid #E2E8F0", background: "#FFFFFF" }}>
                            <div style={{ fontSize: "10.5px", fontWeight: "800", color: "#64748B", textTransform: "uppercase" }}>BALANCE AFTER</div>
                            <div style={{ fontSize: "13.5px", fontWeight: "800", color: "#0F172A", marginTop: "2px" }}>
                              3 days remaining
                            </div>
                          </div>

                          <div style={{ padding: "12px 16px", background: "#FFFFFF" }}>
                            <div style={{ fontSize: "10.5px", fontWeight: "800", color: "#64748B", textTransform: "uppercase" }}>REQUESTED VIA</div>
                            <div style={{ fontSize: "13.5px", fontWeight: "800", color: "#0F172A", marginTop: "2px" }}>
                              AI Assistant
                            </div>
                          </div>
                        </div>

                        {/* Team Availability Warning Alert Banner (Yellow Box) */}
                        <div style={{ background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: "10px", padding: "12px 16px", color: "#92400E", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                          <span style={{ fontSize: "15px" }}>⚠️</span>
                          <div>
                            <strong>Team availability warning.</strong> 2 teammates are already on leave that day — approving brings the team to 3 of 8 out.
                          </div>
                        </div>

                        {/* Approve / Reject Buttons Bar */}
                        <div style={{ display: "flex", gap: "14px", marginTop: "4px" }}>
                          <button
                            type="button"
                            onClick={() => alert("Leave Request Approved for Nupur Iyer!")}
                            style={{
                              flex: 1,
                              padding: "12px",
                              borderRadius: "10px",
                              background: "#059669",
                              color: "#FFFFFF",
                              border: "none",
                              fontSize: "14px",
                              fontWeight: "800",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                              boxShadow: "0 4px 10px rgba(5,150,105,0.2)"
                            }}
                          >
                            ✓ Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => alert("Leave Request Rejected.")}
                            style={{
                              flex: 1,
                              padding: "12px",
                              borderRadius: "10px",
                              background: "#FFFFFF",
                              color: "#DC2626",
                              border: "1.5px solid #FCA5A5",
                              fontSize: "14px",
                              fontWeight: "800",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px"
                            }}
                          >
                            ✕ Reject
                          </button>
                        </div>

                      </div>

                    </div>

                    {/* BOTTOM CARD: TEAM AVAILABILITY BREAKDOWN (EXACT IMAGE 2) */}
                    <div className="card" style={{ padding: "20px", borderRadius: "16px", border: "1px solid #E2E8F0", background: "#FFFFFF" }}>
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#0F172A", margin: 0 }}>
                          Team availability — Fri 21 Aug
                        </h3>
                        <span className="mono" style={{ fontSize: "12.5px", fontWeight: "700", color: "#64748B" }}>
                          6/8 available
                        </span>
                      </div>

                      {/* Visual Progress Bar (Green 75%, Red 25%) */}
                      <div style={{ width: "100%", height: "10px", borderRadius: "5px", background: "#E2E8F0", overflow: "hidden", display: "flex", marginBottom: "16px" }}>
                        <div style={{ width: "75%", height: "100%", background: "#059669" }}></div>
                        <div style={{ width: "25%", height: "100%", background: "#E11D48" }}></div>
                      </div>

                      {/* Teammates List Breakdown */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", color: "#0F172A" }}>
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E11D48" }}></span>
                            Anjali Nair
                          </div>
                          <span style={{ color: "#64748B", fontWeight: "600" }}>On leave</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", color: "#0F172A" }}>
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E11D48" }}></span>
                            Kabir Joshi
                          </div>
                          <span style={{ color: "#64748B", fontWeight: "600" }}>On leave</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", color: "#0F172A" }}>
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D97706" }}></span>
                            Nupur Iyer
                          </div>
                          <span style={{ color: "#64748B", fontWeight: "600" }}>Pending — this request</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", color: "#0F172A" }}>
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#059669" }}></span>
                            5 others
                          </div>
                          <span style={{ color: "#64748B", fontWeight: "600" }}>Available</span>
                        </div>
                      </div>

                    </div>

                    {/* ADDITIONAL PENDING APPROVALS LIST */}
                    {approvals.length > 0 && (
                      <div className="card" style={{ padding: "20px" }}>
                        <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "14px" }}>Other Pending Approvals</h3>
                        <table>
                          <thead><tr><th>Employee</th><th>Type</th><th>Dates</th><th>Remarks</th><th>Action</th></tr></thead>
                          <tbody>
                            {approvals.map((app) => (
                              <tr key={app.id}>
                                <td><div className="cell-person"><div className="mini-avatar">{app.initials}</div><div className="p-name">{app.name}</div></div></td>
                                <td>{app.type}</td><td>{app.dates}</td><td>{app.remarks}</td>
                                <td className="row-actions">
                                  {!app.resolved ? (
                                    <>
                                      <button className="approve-btn" onClick={() => handleResolveApproval(app.id, "Approved")} title="Approve">✓</button>
                                      <button className="reject-btn" onClick={() => handleResolveApproval(app.id, "Rejected")} title="Reject">✕</button>
                                    </>
                                  ) : (
                                    <span style={{ fontSize: "11.5px", color: "var(--ink-soft)" }}>Resolved</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
      {/* EDIT PROFILE MODAL */}
      {isEditProfileOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(36, 27, 53, 0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px',
          backdropFilter: 'blur(4px)'
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: '560px',
            padding: '28px',
            background: 'var(--surface)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>Edit Profile Details</h2>
                <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', marginTop: '2px' }}>Update your personal and professional employee record.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', color: 'var(--ink-soft)', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setProfileData(editProfileForm);
              setIsEditProfileOpen(false);
            }}>
              <div className="field-row">
                <div className="field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={editProfileForm.name}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={editProfileForm.email}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={editProfileForm.phone}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, phone: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Employee Code</label>
                  <input
                    type="text"
                    value={editProfileForm.employeeCode}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, employeeCode: e.target.value })}
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Designation</label>
                  <input
                    type="text"
                    value={editProfileForm.designation}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, designation: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Department</label>
                  <input
                    type="text"
                    value={editProfileForm.department}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, department: e.target.value })}
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Reporting Manager</label>
                  <input
                    type="text"
                    value={editProfileForm.manager}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, manager: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Employment Type</label>
                  <input
                    type="text"
                    value={editProfileForm.employmentType}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, employmentType: e.target.value })}
                  />
                </div>
              </div>

              <div className="field">
                <label>Residential Address</label>
                <input
                  type="text"
                  value={editProfileForm.address}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, address: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ width: 'auto' }}
                  onClick={() => setIsEditProfileOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: 'auto' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SALARY COMPONENT MODAL OVERLAY */}
      {isAddComponentOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div className="card" style={{ width: "100%", maxWidth: "480px", padding: "26px", borderRadius: "16px", background: "#FFFFFF", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "1px solid var(--line)", paddingBottom: "12px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                ADD SALARY COMPONENT
              </h3>
              <button onClick={() => setIsAddComponentOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "var(--ink-soft)" }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Component Name */}
              <div className="field">
                <label>Component Name</label>
                <input
                  type="text"
                  placeholder="e.g. Special Allowance or House Rent Allowance"
                  value={newCompName}
                  onChange={(e) => setNewCompName(e.target.value)}
                  required
                />
              </div>

              {/* Calculation Type */}
              <div className="field">
                <label>Calculation Type</label>
                <div style={{ display: "flex", gap: "14px", marginTop: "4px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>
                    <input
                      type="radio"
                      name="calcType"
                      checked={newCompCalcType === "percentage"}
                      onChange={() => setNewCompCalcType("percentage")}
                    />
                    Percentage of Wage
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>
                    <input
                      type="radio"
                      name="calcType"
                      checked={newCompCalcType === "fixed"}
                      onChange={() => setNewCompCalcType("fixed")}
                    />
                    Fixed Amount
                  </label>
                </div>
              </div>

              {/* Value Input */}
              <div className="field">
                <label>{newCompCalcType === "percentage" ? "Percentage Value (%)" : "Fixed Amount (₹)"}</label>
                <input
                  type="number"
                  value={newCompValue}
                  onChange={(e) => setNewCompValue(Number(e.target.value))}
                  required
                />
              </div>

              {/* Real-time Preview */}
              <div style={{ background: "#F8FAFC", padding: "12px 16px", borderRadius: "8px", border: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748B" }}>CALCULATED PREVIEW</span>
                <span className="mono" style={{ fontSize: "16px", fontWeight: "800", color: "var(--primary)" }}>
                  ₹ {calculateCompAmount({ name: newCompName || "Preview", calcType: newCompCalcType, value: newCompValue, basedOn: newCompBasedOn }, monthlyWage).toLocaleString("en-IN")} / month
                </span>
              </div>

              {/* Modal Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button type="button" className="btn btn-ghost" style={{ width: "auto" }} onClick={() => setIsAddComponentOpen(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "auto" }}
                  onClick={() => {
                    if (newCompName.trim()) {
                      const newComp = {
                        id: Date.now().toString(),
                        name: newCompName.trim(),
                        calcType: newCompCalcType,
                        value: newCompValue,
                        basedOn: newCompBasedOn,
                      };
                      setSalaryComponents([...salaryComponents, newComp]);
                      setIsAddComponentOpen(false);
                    }
                  }}
                >
                  Add Component
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* EDIT PAYSLIP MODAL */}
      {editingPayrollEmp && (
        <div style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div className="card" style={{ width: "100%", maxWidth: "480px", padding: "26px", borderRadius: "16px", background: "#FFFFFF", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "1px solid var(--line)", paddingBottom: "12px" }}>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                  Edit Employee Payslip
                </h3>
                <span style={{ fontSize: "12px", color: "var(--ink-soft)" }}>{editingPayrollEmp.name} ({editingPayrollEmp.code})</span>
              </div>
              <button onClick={() => setEditingPayrollEmp(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "var(--ink-soft)" }}>✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const updatedNet = editGrossWage - editPfAmount - editTaxAmount;
              setEmployeePayrolls(employeePayrolls.map(p => p.id === editingPayrollEmp.id ? { ...p, grossWage: editGrossWage, pf: editPfAmount, tax: editTaxAmount, netPay: updatedNet } : p));
              setEditingPayrollEmp(null);
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="field">
                  <label>Monthly Gross Wage (₹)</label>
                  <input
                    type="number"
                    value={editGrossWage}
                    onChange={(e) => setEditGrossWage(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="field">
                  <label>Employee PF Deduction (₹)</label>
                  <input
                    type="number"
                    value={editPfAmount}
                    onChange={(e) => setEditPfAmount(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="field">
                  <label>Professional Tax (₹)</label>
                  <input
                    type="number"
                    value={editTaxAmount}
                    onChange={(e) => setEditTaxAmount(Number(e.target.value))}
                    required
                  />
                </div>

                <div style={{ background: "#ECFDF5", padding: "12px 16px", borderRadius: "8px", border: "1px solid #A7F3D0", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#047857" }}>UPDATED NET PAY</span>
                  <span className="mono" style={{ fontSize: "18px", fontWeight: "800", color: "#047857" }}>
                    ₹ {(editGrossWage - editPfAmount - editTaxAmount).toLocaleString("en-IN")}.00
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                  <button type="button" className="btn btn-ghost" style={{ width: "auto" }} onClick={() => setEditingPayrollEmp(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ width: "auto" }}>
                    ✓ Save Payslip Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GENERATE NEW PAYSLIP MODAL */}
      {isGeneratePayslipOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div className="card" style={{ width: "100%", maxWidth: "480px", padding: "26px", borderRadius: "16px", background: "#FFFFFF", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "1px solid var(--line)", paddingBottom: "12px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                Generate Monthly Payslip
              </h3>
              <button onClick={() => setIsGeneratePayslipOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "var(--ink-soft)" }}>✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const selectedEmp = employeePayrolls.find(e => e.id === genSelectedEmpId) || employeePayrolls[0];
              const computedPf = Math.round(genGrossWage * 0.06);
              const computedTax = 200;
              const computedNet = genGrossWage - computedPf - computedTax;
              
              const newPayroll = {
                id: `DF-${Math.floor(1000 + Math.random() * 9000)}`,
                code: selectedEmp.code,
                name: selectedEmp.name,
                dept: selectedEmp.dept,
                role: selectedEmp.role,
                grossWage: genGrossWage,
                pf: computedPf,
                tax: computedTax,
                netPay: computedNet,
                status: "🟢 Dispatched",
                initials: selectedEmp.initials,
                avatarBg: selectedEmp.avatarBg,
              };
              setEmployeePayrolls([newPayroll, ...employeePayrolls]);
              setIsGeneratePayslipOpen(false);
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="field">
                  <label>Select Employee</label>
                  <select value={genSelectedEmpId} onChange={(e) => setGenSelectedEmpId(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "1.5px solid var(--line)", fontSize: "13.5px", fontWeight: "600" }}>
                    {employeePayrolls.map(e => (
                      <option key={e.id} value={e.id}>{e.name} ({e.code} - {e.dept})</option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label>Monthly Base Wage (₹)</label>
                  <input
                    type="number"
                    value={genGrossWage}
                    onChange={(e) => setGenGrossWage(Number(e.target.value))}
                    required
                  />
                </div>

                <div style={{ background: "#F8FAFC", padding: "12px 16px", borderRadius: "8px", border: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748B" }}>ESTIMATED NET PAY</span>
                  <span className="mono" style={{ fontSize: "16px", fontWeight: "800", color: "var(--teal)" }}>
                    ₹ {(genGrossWage - Math.round(genGrossWage * 0.06) - 200).toLocaleString("en-IN")}.00
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                  <button type="button" className="btn btn-ghost" style={{ width: "auto" }} onClick={() => setIsGeneratePayslipOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ width: "auto" }}>
                    ✓ Generate & Dispatch Payslip
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT EMPLOYEE WORK LOG & ATTENDANCE MODAL */}
      {editingWorkRecord && (
        <div style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div className="card" style={{ width: "100%", maxWidth: "500px", padding: "26px", borderRadius: "16px", background: "#FFFFFF", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "1px solid var(--line)", paddingBottom: "12px" }}>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                  Edit Attendance & Work Log
                </h3>
                <span style={{ fontSize: "12px", color: "var(--ink-soft)" }}>{editingWorkRecord.name} ({editingWorkRecord.code})</span>
              </div>
              <button onClick={() => setEditingWorkRecord(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "var(--ink-soft)" }}>✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setWorkOverviewRecords(workOverviewRecords.map(r => r.id === editingWorkRecord.id ? { ...r, clockIn: editWorkClockIn, clockOut: editWorkClockOut, activity: editWorkActivity, status: editWorkStatus, pill: editWorkStatus === "Working" ? "pill-teal" : editWorkStatus === "On Break" ? "pill-amber" : "pill-gray" } : r));
              setEditingWorkRecord(null);
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                
                <div className="field-row">
                  <div className="field">
                    <label>Clock In Time</label>
                    <input
                      type="text"
                      value={editWorkClockIn}
                      onChange={(e) => setEditWorkClockIn(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <label>Clock Out Time</label>
                    <input
                      type="text"
                      value={editWorkClockOut}
                      onChange={(e) => setEditWorkClockOut(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Current Status</label>
                  <select
                    value={editWorkStatus}
                    onChange={(e) => setEditWorkStatus(e.target.value)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1.5px solid var(--line)", fontSize: "13.5px", fontWeight: "600" }}
                  >
                    <option value="Working">Working (Checked In)</option>
                    <option value="On Break">On Break</option>
                    <option value="Checked Out">Checked Out</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>

                <div className="field">
                  <label>Logged Work Activity / Task Description</label>
                  <textarea
                    rows={3}
                    value={editWorkActivity}
                    onChange={(e) => setEditWorkActivity(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--line)", fontSize: "13px", fontFamily: "inherit" }}
                    required
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                  <button type="button" className="btn btn-ghost" style={{ width: "auto" }} onClick={() => setEditingWorkRecord(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ width: "auto" }}>
                    ✓ Save Work Record
                  </button>
                </div>

              </div>
            </form>

          </div>
        </div>
      )}

      {/* RETROACTIVE ATTENDANCE & LOG CORRECTION MODAL */}
      {editingCalendarDay && (
        <div style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div className="card" style={{ width: "100%", maxWidth: "520px", padding: "26px", borderRadius: "16px", background: "#FFFFFF", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "1px solid var(--line)", paddingBottom: "12px" }}>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                  Retroactive Attendance & Log Correction
                </h3>
                <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--teal)" }}>
                  Editing Date: {editingCalendarDay.date} ({editingCalendarDay.weekday})
                </span>
              </div>
              <button onClick={() => setEditingCalendarDay(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "var(--ink-soft)" }}>✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setMonthCalendarDays(monthCalendarDays.map(d => d.day === editingCalendarDay.day ? { ...d, status: retroStatus, clockIn: retroClockIn, clockOut: retroClockOut, activity: retroActivity, hours: retroStatus === "Present" ? "8.5h" : "0h" } : d));
              setEditingCalendarDay(null);
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                
                <div className="field-row">
                  <div className="field">
                    <label>Retroactive Clock-In Time</label>
                    <input
                      type="text"
                      value={retroClockIn}
                      onChange={(e) => setRetroClockIn(e.target.value)}
                      placeholder="e.g. 09:00 AM"
                      required
                    />
                  </div>
                  <div className="field">
                    <label>Retroactive Clock-Out Time</label>
                    <input
                      type="text"
                      value={retroClockOut}
                      onChange={(e) => setRetroClockOut(e.target.value)}
                      placeholder="e.g. 06:30 PM"
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Attendance Status</label>
                  <select
                    value={retroStatus}
                    onChange={(e) => setRetroStatus(e.target.value)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1.5px solid var(--line)", fontSize: "13.5px", fontWeight: "600" }}
                  >
                    <option value="Present">🟢 Present in Office (Valid Record)</option>
                    <option value="Leave">🟡 On Leave</option>
                    <option value="Missing">🔴 Missing / Unverified</option>
                  </select>
                </div>

                <div className="field">
                  <label>Logged Work Tasks & Reason for Historical Edit</label>
                  <textarea
                    rows={3}
                    value={retroActivity}
                    onChange={(e) => setRetroActivity(e.target.value)}
                    placeholder="Enter tasks done on this date and reason for manual HR override..."
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--line)", fontSize: "13px", fontFamily: "inherit" }}
                    required
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                  <button type="button" className="btn btn-ghost" style={{ width: "auto" }} onClick={() => setEditingCalendarDay(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ width: "auto" }}>
                    ✓ Save Retroactive Log Correction
                  </button>
                </div>

              </div>
            </form>

          </div>
        </div>
      )}

      {/* APPROVE SALARY APPRAISAL HIKE MODAL */}
      {appraisalTargetEmp && (
        <div style={{ position: "fixed", inset: 0, zIndex: 110, background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div className="card" style={{ width: "100%", maxWidth: "520px", padding: "26px", borderRadius: "16px", background: "#FFFFFF", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "1px solid var(--line)", paddingBottom: "12px" }}>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                  Trigger Salary Appraisal & Hike
                </h3>
                <span style={{ fontSize: "12px", color: "var(--ink-soft)" }}>
                  {appraisalTargetEmp.name} ({appraisalTargetEmp.code}) • Performance: {appraisalTargetEmp.score}%
                </span>
              </div>
              <button onClick={() => setAppraisalTargetEmp(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "var(--ink-soft)" }}>✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const newMonthlyWage = Math.round(appraisalTargetEmp.currentWage * (1 + customHikePercent / 100));
              setMonthlyWage(newMonthlyWage);
              alert(`Appraisal approved! Salary for ${appraisalTargetEmp.name} has been updated from ₹ ${appraisalTargetEmp.currentWage.toLocaleString("en-IN")} to ₹ ${newMonthlyWage.toLocaleString("en-IN")} (+${customHikePercent}% hike).`);
              setAppraisalTargetEmp(null);
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                
                <div style={{ background: "#F8FAFC", padding: "14px", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "12.5px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>
                    AI APPRAISAL INSIGHT
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#0F172A" }}>
                    {appraisalTargetEmp.status}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
                    Project Deliverables: {appraisalTargetEmp.projects}
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label>Current Monthly Base Wage</label>
                    <input
                      type="text"
                      value={`₹ ${appraisalTargetEmp.currentWage.toLocaleString("en-IN")}`}
                      disabled
                      style={{ background: "#F1F5F9", color: "#475569", fontWeight: "700" }}
                    />
                  </div>
                  <div className="field">
                    <label>Appraisal Hike Percentage (%)</label>
                    <input
                      type="number"
                      value={customHikePercent}
                      onChange={(e) => setCustomHikePercent(Number(e.target.value))}
                      min={1}
                      max={50}
                      required
                    />
                  </div>
                </div>

                <div style={{ background: "#ECFDF5", padding: "12px 16px", borderRadius: "10px", border: "1.5px solid #A7F3D0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#047857", textTransform: "uppercase" }}>NEW PROPOSED REVISED WAGE</span>
                    <div className="mono" style={{ fontSize: "18px", fontWeight: "800", color: "#059669" }}>
                      ₹ {Math.round(appraisalTargetEmp.currentWage * (1 + customHikePercent / 100)).toLocaleString("en-IN")}.00 / Month
                    </div>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: "800", color: "#047857", background: "#DCFCE7", padding: "4px 10px", borderRadius: "12px" }}>
                    + {customHikePercent}% Hike
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                  <button type="button" className="btn btn-ghost" style={{ width: "auto" }} onClick={() => setAppraisalTargetEmp(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ width: "auto" }}>
                    ✓ Approve & Apply Salary Hike
                  </button>
                </div>

              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}

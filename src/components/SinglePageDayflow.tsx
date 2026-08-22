"use client";

import React, { useState } from "react";

export default function SinglePageDayflow() {
  const [authHidden, setAuthHidden] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [signupRole, setSignupRole] = useState<"Employee" | "HR / Admin">("Employee");
  const [activePage, setActivePage] = useState<"dashboard" | "profile" | "attendance" | "leave" | "payroll" | "admin" | "approvals">("dashboard");
  const [currentRole, setCurrentRole] = useState<"employee" | "admin">("employee");
  
  // Attendance State
  const [isCheckedIn, setIsCheckedIn] = useState(true);

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

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now().toString(),
      type: leaveType,
      dates: `${leaveFrom || "—"} — ${leaveTo || "—"}`,
      days: "1",
      remarks: leaveRemarks || "—",
      status: "Pending",
      pill: "pill-amber",
    };
    setLeaveHistory([newEntry, ...leaveHistory]);
    setLeaveFrom("");
    setLeaveTo("");
    setLeaveRemarks("");
  };

  const handleResolveApproval = (id: string, newStatus: "Approved" | "Rejected") => {
    setApprovals(
      approvals.map((app) => (app.id === id ? { ...app, status: newStatus, resolved: true } : app))
    );
  };

  const handleEnterApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setActivePage("dashboard");
    setAuthHidden(true);
  };

  const handleRoleSwitch = (role: "employee" | "admin") => {
    setCurrentRole(role);
    if (role === "admin") {
      setActivePage("admin");
    } else {
      setActivePage("dashboard");
    }
  };

  return (
    <>
      {/* ================= AUTH SCREEN ================= */}
      {!authHidden && (
        <div id="auth">
          <div className="auth-visual">
            <div className="auth-brand"><span className="dot"></span> Dayflow</div>
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
                  <h2>Welcome back</h2>
                  <p className="sub">Sign in with your work email to continue.</p>
                  <div className="field"><label>Email address</label><input type="email" placeholder="you@company.com" defaultValue="priya.shah@dayflow.io" required /></div>
                  <div className="field"><label>Password</label><input type="password" placeholder="••••••••" defaultValue="••••••••" required /></div>
                  <button type="submit" className="btn btn-primary">Sign In →</button>
                  <p className="auth-foot">Forgot password? <a href="#">Reset it</a></p>
                </form>
              ) : (
                <form onSubmit={handleEnterApp} id="signup-form">
                  <h2>Create your account</h2>
                  <p className="sub">Verify with your work email to get started.</p>
                  <div className="role-pick">
                    <div className={`role-opt ${signupRole === "Employee" ? "active" : ""}`} onClick={() => setSignupRole("Employee")}>Employee</div>
                    <div className={`role-opt ${signupRole === "HR / Admin" ? "active" : ""}`} onClick={() => setSignupRole("HR / Admin")}>HR / Admin</div>
                  </div>
                  <div className="field-row">
                    <div className="field"><label>Employee ID</label><input placeholder="DF-2291" defaultValue="DF-2291" /></div>
                    <div className="field"><label>Full name</label><input placeholder="Priya Shah" defaultValue="Priya Shah" /></div>
                  </div>
                  <div className="field"><label>Work email</label><input type="email" placeholder="you@company.com" required /></div>
                  <div className="field"><label>Password</label><input type="password" placeholder="Min. 8 characters" required /></div>
                  <button type="submit" className="btn btn-primary">Create Account →</button>
                  <p className="auth-foot">We'll send a verification link to your inbox.</p>
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
            <div className="sb-brand"><span className="dot"></span> Dayflow</div>

            <div className="nav-group">
              <div className="nav-label">Workspace</div>
              <button className={`nav-item ${activePage === "dashboard" ? "active" : ""}`} onClick={() => setActivePage("dashboard")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>
                Dashboard
              </button>
              <button className={`nav-item ${activePage === "profile" ? "active" : ""}`} onClick={() => setActivePage("profile")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>
                My Profile
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
            </div>

            {currentRole === "admin" && (
              <div className="nav-group" id="admin-nav">
                <div className="nav-label">HR Console</div>
                <button className={`nav-item ${activePage === "admin" ? "active" : ""}`} onClick={() => setActivePage("admin")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                  Employees
                </button>
                <button className={`nav-item ${activePage === "approvals" ? "active" : ""}`} onClick={() => setActivePage("approvals")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                  Approvals <span className="mono" style={{ marginLeft: "auto", background: "var(--rose)", color: "#fff", fontSize: "10px", padding: "1px 6px", borderRadius: "999px" }}>3</span>
                </button>
              </div>
            )}

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
              <div className="top-right">
                <div className="role-switch">
                  <button className={currentRole === "employee" ? "active" : ""} onClick={() => handleRoleSwitch("employee")}>Employee</button>
                  <button className={currentRole === "admin" ? "active" : ""} onClick={() => handleRoleSwitch("admin")}>Admin</button>
                </div>
                <button className="icon-btn">
                  <span className="badge-dot"></span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>
                </button>
                <div className="avatar">PS</div>
              </div>
            </div>

            <div className="content">
              {/* PAGE: DASHBOARD */}
              {activePage === "dashboard" && (
                <section className="page active" id="page-dashboard">
                  <div className="page-head">
                    <div>
                      <div className="eyebrow">Wednesday, 20 August</div>
                      <h1>Good morning, Priya 👋</h1>
                      <p className="desc">You have 1 pending approval and 2 leave days used this month.</p>
                    </div>
                    <button className="btn btn-primary" style={{ width: "auto" }} onClick={() => setActivePage("attendance")}>Check In →</button>
                  </div>

                  <div className="quick-cards">
                    <div className="qc" onClick={() => setActivePage("profile")}>
                      <div className="qc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg></div>
                      <h4>Profile</h4><p>View & edit your details</p>
                    </div>
                    <div className="qc" onClick={() => setActivePage("attendance")}>
                      <div className="qc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18"/></svg></div>
                      <h4>Attendance</h4><p>96% this month</p>
                    </div>
                    <div className="qc" onClick={() => setActivePage("leave")}>
                      <div className="qc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v6l4 2"/><circle cx="12" cy="12" r="9"/></svg></div>
                      <h4>Leave Requests</h4><p>1 pending review</p>
                    </div>
                    <div className="qc" onClick={() => setActivePage("payroll")}>
                      <div className="qc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="13" rx="2"/><circle cx="12" cy="12.5" r="3"/></svg></div>
                      <h4>Payroll</h4><p>Next payout 1 Sep</p>
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
                </section>
              )}

              {/* PAGE: PROFILE */}
              {activePage === "profile" && (
                <section className="page active" id="page-profile">
                  <div className="page-head">
                    <div><div className="eyebrow">Employee Profile</div><h1>My Profile</h1></div>
                    <button className="btn btn-ghost">Edit Details</button>
                  </div>
                  <div className="card">
                    <div className="profile-head">
                      <div className="profile-avatar">PS</div>
                      <div>
                        <h2>Priya Shah</h2>
                        <p>Senior Product Designer • Design Team • DF-2291</p>
                      </div>
                    </div>
                    <div className="kv-grid">
                      <div className="kv"><label>Email</label><div>priya.shah@dayflow.io</div></div>
                      <div className="kv"><label>Phone</label><div>+91 98765 43210</div></div>
                      <div className="kv"><label>Date of Joining</label><div>03 Feb 2023</div></div>
                      <div className="kv"><label>Reporting Manager</label><div>Rakesh Menon</div></div>
                      <div className="kv"><label>Address</label><div>402, Willow Residency, Pune</div></div>
                      <div className="kv"><label>Employment Type</label><div>Full-time • Permanent</div></div>
                    </div>
                  </div>
                </section>
              )}

              {/* PAGE: ATTENDANCE */}
              {activePage === "attendance" && (
                <section className="page active" id="page-attendance">
                  <div className="page-head">
                    <div><div className="eyebrow">This Week</div><h1>Attendance</h1></div>
                  </div>
                  <div className="grid grid-3">
                    <div className="card">
                      <div className="card-head-row"><h3>Weekly Overview</h3><span className="pill pill-teal">96% present</span></div>
                      <table>
                        <thead><tr><th>Day</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Status</th></tr></thead>
                        <tbody>
                          <tr><td>Mon, 18 Aug</td><td className="mono">09:04</td><td className="mono">18:12</td><td className="mono">9h 08m</td><td><span className="pill pill-teal">Present</span></td></tr>
                          <tr><td>Tue, 19 Aug</td><td className="mono">09:00</td><td className="mono">17:55</td><td className="mono">8h 55m</td><td><span className="pill pill-teal">Present</span></td></tr>
                          <tr><td>Wed, 20 Aug</td><td className="mono">09:12</td><td className="mono">—</td><td className="mono">—</td><td><span className="pill pill-amber">Half-day</span></td></tr>
                          <tr><td>Thu, 21 Aug</td><td className="mono">—</td><td className="mono">—</td><td className="mono">—</td><td><span className="pill pill-rose">Leave</span></td></tr>
                          <tr><td>Fri, 22 Aug</td><td className="mono">—</td><td className="mono">—</td><td className="mono">—</td><td><span className="pill pill-gray">Upcoming</span></td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="checkin-box card">
                      <div className="checkin-status">{isCheckedIn ? "You're checked in since" : "You checked out at"}</div>
                      <div className="checkin-time">{isCheckedIn ? "09:12 AM" : "06:15 PM"}</div>
                      <div className="checkin-status">{isCheckedIn ? "Elapsed: 3h 42m" : "Total Today: 9h 03m"}</div>
                      <button className={`checkin-btn ${isCheckedIn ? "out" : ""}`} onClick={() => setIsCheckedIn(!isCheckedIn)}>
                        {isCheckedIn ? "Check Out" : "Check In"}
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* PAGE: LEAVE */}
              {activePage === "leave" && (
                <section className="page active" id="page-leave">
                  <div className="page-head">
                    <div><div className="eyebrow">Time Off</div><h1>Leave Requests</h1></div>
                  </div>
                  <div className="grid grid-3">
                    <div className="card">
                      <div className="card-head-row"><h3>Request History</h3></div>
                      <table>
                        <thead><tr><th>Type</th><th>Dates</th><th>Days</th><th>Remarks</th><th>Status</th></tr></thead>
                        <tbody>
                          {leaveHistory.map((item) => (
                            <tr key={item.id}>
                              <td style={{ fontWeight: 600 }}>{item.type}</td>
                              <td>{item.dates}</td>
                              <td className="mono">{item.days}</td>
                              <td style={{ color: "var(--ink-soft)" }}>{item.remarks}</td>
                              <td><span className={`pill ${item.pill}`}>{item.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="form-card card">
                      <h3>Apply for Leave</h3>
                      <form onSubmit={handleApplyLeave}>
                        <div className="field"><label>Leave Type</label>
                          <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                            <option>Paid Leave</option><option>Sick Leave</option><option>Unpaid Leave</option>
                          </select>
                        </div>
                        <div className="field-row">
                          <div className="field"><label>From</label><input type="date" value={leaveFrom} onChange={(e) => setLeaveFrom(e.target.value)} required /></div>
                          <div className="field"><label>To</label><input type="date" value={leaveTo} onChange={(e) => setLeaveTo(e.target.value)} required /></div>
                        </div>
                        <div className="field"><label>Remarks</label><input placeholder="Reason for leave" value={leaveRemarks} onChange={(e) => setLeaveRemarks(e.target.value)} /></div>
                        <button className="btn btn-primary" type="submit">Submit Request</button>
                      </form>
                    </div>
                  </div>
                </section>
              )}

              {/* PAGE: PAYROLL */}
              {activePage === "payroll" && (
                <section className="page active" id="page-payroll">
                  <div className="page-head">
                    <div><div className="eyebrow">Read-only</div><h1>Payroll</h1></div>
                    <span className="pill pill-gray">Next payout • 01 Sep 2026</span>
                  </div>
                  <div className="grid grid-3">
                    <div className="card">
                      <div className="card-head-row"><h3>July 2026 Payslip</h3><button className="link-btn">Download PDF</button></div>
                      <div className="payslip-row"><span>Basic Salary</span><span className="amt">₹ 62,000</span></div>
                      <div className="payslip-row"><span>HRA</span><span className="amt">₹ 18,600</span></div>
                      <div className="payslip-row"><span>Special Allowance</span><span className="amt">₹ 9,400</span></div>
                      <div className="payslip-row"><span>Provident Fund</span><span className="amt" style={{ color: "var(--rose)" }}>- ₹ 7,440</span></div>
                      <div className="payslip-row"><span>Professional Tax</span><span className="amt" style={{ color: "var(--rose)" }}>- ₹ 200</span></div>
                      <div className="payslip-row" style={{ fontWeight: 700, fontSize: "14px" }}><span>Net Pay</span><span className="amt" style={{ color: "var(--teal)" }}>₹ 82,360</span></div>
                    </div>
                    <div className="card stat-card">
                      <div className="stat-label">Annual CTC</div>
                      <div className="stat-num mono">₹ 11,04,000</div>
                      <div className="stat-trend trend-up" style={{ width: "fit-content" }}>↑ 8% last review</div>
                    </div>
                  </div>
                </section>
              )}

              {/* PAGE: ADMIN EMPLOYEES */}
              {activePage === "admin" && (
                <section className="page active" id="page-admin">
                  <div className="page-head">
                    <div><div className="eyebrow">HR Console</div><h1>Employees</h1></div>
                    <button className="btn btn-primary" style={{ width: "auto" }}>+ Add Employee</button>
                  </div>

                  <div className="grid grid-4" style={{ marginBottom: "22px" }}>
                    <div className="card stat-card">
                      <div className="stat-top"><span className="stat-label">Total Employees</span><div className="stat-icon" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div></div>
                      <div className="stat-num mono">128</div>
                    </div>
                    <div className="card stat-card">
                      <div className="stat-top"><span className="stat-label">Present Today</span><div className="stat-icon" style={{ background: "var(--teal-soft)", color: "var(--teal)" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/></svg></div></div>
                      <div className="stat-num mono">117</div>
                    </div>
                    <div className="card stat-card">
                      <div className="stat-top"><span className="stat-label">On Leave</span><div className="stat-icon" style={{ background: "var(--rose-soft)", color: "var(--rose)" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v6l4 2"/><circle cx="12" cy="12" r="9"/></svg></div></div>
                      <div className="stat-num mono">8</div>
                    </div>
                    <div className="card stat-card">
                      <div className="stat-top"><span className="stat-label">Pending Approvals</span><div className="stat-icon" style={{ background: "var(--amber-soft)", color: "var(--amber)" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="17" rx="2"/></svg></div></div>
                      <div className="stat-num mono">3</div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-head-row"><h3>All Employees</h3><button className="link-btn" onClick={() => setActivePage("approvals")}>View Approvals →</button></div>
                    <table>
                      <thead><tr><th>Employee</th><th>Department</th><th>Today's Flow</th><th>Status</th><th></th></tr></thead>
                      <tbody>
                        <tr>
                          <td><div className="cell-person"><div className="mini-avatar">PS</div><div><div className="p-name">Priya Shah</div><div className="p-sub mono">DF-2291</div></div></div></td>
                          <td>Design</td>
                          <td style={{ width: "160px" }}><div className="ribbon mini"><div className="seg seg-work" style={{ flex: 5 }}></div><div className="seg seg-meeting" style={{ flex: 2 }}></div><div className="seg seg-work" style={{ flex: 3 }}></div></div></td>
                          <td><span className="pill pill-teal">Present</span></td>
                          <td className="row-actions"><button><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button></td>
                        </tr>
                        <tr>
                          <td><div className="cell-person"><div className="mini-avatar">RK</div><div><div className="p-name">Rohan Kulkarni</div><div className="p-sub mono">DF-2104</div></div></div></td>
                          <td>Engineering</td>
                          <td style={{ width: "160px" }}><div className="ribbon mini"><div className="seg seg-work" style={{ flex: 6 }}></div><div className="seg seg-break" style={{ flex: 1 }}></div><div className="seg seg-work" style={{ flex: 4 }}></div></div></td>
                          <td><span className="pill pill-teal">Present</span></td>
                          <td className="row-actions"><button><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button></td>
                        </tr>
                        <tr>
                          <td><div className="cell-person"><div className="mini-avatar">AN</div><div><div className="p-name">Anjali Nair</div><div className="p-sub mono">DF-1988</div></div></div></td>
                          <td>Marketing</td>
                          <td style={{ width: "160px" }}><div className="ribbon mini"><div className="seg seg-idle" style={{ flex: 1 }}></div></div></td>
                          <td><span className="pill pill-rose">On Leave</span></td>
                          <td className="row-actions"><button><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button></td>
                        </tr>
                        <tr>
                          <td><div className="cell-person"><div className="mini-avatar">SV</div><div><div className="p-name">Sameer Verma</div><div className="p-sub mono">DF-2033</div></div></div></td>
                          <td>Sales</td>
                          <td style={{ width: "160px" }}><div className="ribbon mini"><div className="seg seg-work" style={{ flex: 3 }}></div><div className="seg seg-idle" style={{ flex: 3 }}></div></div></td>
                          <td><span className="pill pill-amber">Half-day</span></td>
                          <td className="row-actions"><button><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* PAGE: ADMIN APPROVALS */}
              {activePage === "approvals" && (
                <section className="page active" id="page-approvals">
                  <div className="page-head">
                    <div><div className="eyebrow">HR Console</div><h1>Leave Approvals</h1></div>
                  </div>
                  <div className="card">
                    <table>
                      <thead><tr><th>Employee</th><th>Type</th><th>Dates</th><th>Remarks</th><th>Status</th><th>Action</th></tr></thead>
                      <tbody>
                        {approvals.map((app) => (
                          <tr key={app.id}>
                            <td><div className="cell-person"><div className="mini-avatar">{app.initials}</div><div className="p-name">{app.name}</div></div></td>
                            <td>{app.type}</td><td>{app.dates}</td><td>{app.remarks}</td>
                            <td><span className={`pill ${app.status === "Approved" ? "pill-teal" : app.status === "Rejected" ? "pill-rose" : "pill-amber"}`}>{app.status}</span></td>
                            <td className="row-actions">
                              {!app.resolved ? (
                                <>
                                  <button className="approve-btn" onClick={() => handleResolveApproval(app.id, "Approved")} title="Approve">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                                  </button>
                                  <button className="reject-btn" onClick={() => handleResolveApproval(app.id, "Rejected")} title="Reject">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                  </button>
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
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

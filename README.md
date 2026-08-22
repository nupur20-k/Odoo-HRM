# ⚡ Dayflow HRMS — Human Resource Management System

> **Every workday, perfectly aligned.**  
> A modern, AI-powered enterprise Human Resource Management System (HRMS) engineered for seamless employee self-service, real-time attendance tracking, dynamic wage calculations, automated appraisals, and conversational AI leave management.

---

[![Next.js 14](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌟 Key Platform Modules & Highlights

### 🤖 1. Conversational AI Leave Assistant ("Dayflow Assistant")
* **Smart Intent Recognition**: Reads live employee leave balances, company holiday calendars, and department capacity in real time.
* **Instant Team Availability Checks**: Alerts employees and HR if team availability drops below critical thresholds (e.g. `⚠️ 2 of 8 teammates already on leave`).
* **Medical Certificate Uploader**: Mandatory doctor note/medical certificate attachment for Sick Leave requests.
* **Interactive Approval Cards**: Generates **"WHAT HR SEES"** approval cards featuring a 4-grid detail breakdown and visual dual-color capacity progress bars.

### 👔 2. HR Work Overview & Live Tracking Console
* **Real-time Staff Tracker**: Live monitoring of all active employees (`Working`, `On Break`, `Checked Out`) with ongoing activity descriptions and logged hour counters.
* **One-Click Activity & Time Corrections**: Allows HR managers to modify clock-in/out times, status, and task logs live.

### 📅 3. Historical Attendance & Calendar Log Editor
* **31-Day Attendance Matrix**: Color-coded month matrix highlighting present days, casual leaves, and missing clock-ins (`⚠️ Forgot to Clock In`).
* **Retroactive Log Corrections**: HR can click on any historical day box (even 1 month prior) to rectify missed clock-ins and adjust recorded work activities.

### 💰 4. Configurable Payroll & Salary Component Engine
* **Dynamic Wage Auto-Computation**: Adjusting the `Month Wage` automatically recalculates all breakdown components in real time:
  * **Basic Salary**: 50.00% of wage
  * **House Rent Allowance (HRA)**: 50.00% of Basic
  * **Standard Allowance**: 16.67% of Basic
  * **Performance Bonus**: 8.33% of Basic
  * **Leave Travel Allowance (LTA)**: 8.33% of Basic
  * **Fixed Allowance**: Remainder / 11.67%
* **Provident Fund (PF) & Tax Compliance**: Auto-computes Employee PF (12%), Employer PF (12%), and Professional Tax (₹200/mo).
* **Confidentiality Controls**: Dedicated `Salary Info` tab visible exclusively under Admin/HR credentials.

### 🏆 5. AI Performance Evaluation & Appraisal Engine
* **Performance Scoring**: Calculates an effort index from attendance consistency, sprint deliverable completion rate, and peer satisfaction ratings.
* **Automated Merit Hike Recommendations**: Recommends salary appraisals (e.g. `🏆 Recommended for Promotion & 20% Hike`).
* **One-Click Appraisal Triggers**: Approving an appraisal instantly updates base wages across live payroll.

### 👤 6. Comprehensive Multi-Tab Profile Management
* **Resume & Skills**: Editable bio ("About"), job passions, hobbies, skills tags, and cert lists.
* **Private Info**: Bank details, IFSC, PAN, UAN, DOB, and personal identifiers.
* **Salary Info**: Admin-confidential compensation breakdown.
* **Security**: Password management and login activity tracking.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | Custom Vanilla CSS Design System + Tailwind CSS |
| **Typography** | Sora & JetBrains Mono (Google Fonts) |
| **Icons** | Custom SVG UI Icons |
| **State Management** | React Hooks & Live Reactive State Engine |

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18.0.0 or higher
* npm v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nupur20-k/Odoo-HRM.git
   cd Odoo-HRM
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

---

## 🔑 Quick Demo Credentials

| Role | Login ID / Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Employee** | `DFPRSH20230001` | `DF#Pass2026!` | Work Log, Attendance, AI Leave Assistant, Payslips, My Performance, Profile |
| **HR Manager** | `DFHRRK20230002` | `DF#HRManager2026!` | Work Overview, Directory, Approvals, Payroll, Calendar Editor, Appraisals, Admin Salary Info |

---

## 📂 Project Structure

```
Odoo-HRM/
├── public/
│   ├── logo/                # Dayflow SVG Brand Assets
│   └── favicon.ico
├── src/
│   ├── app/                 # Next.js App Router Pages & Routes
│   │   ├── (admin)/         # Admin & HR Console Routes
│   │   ├── (employee)/      # Employee Workspace Routes
│   │   ├── globals.css      # Design System Tokens & Utility Classes
│   │   └── page.tsx         # Entry Root Component
│   ├── components/          # Reusable UI Components
│   │   ├── SinglePageDayflow.tsx  # Core Dayflow Interactive Engine
│   │   ├── admin/           # HR Directory & Approvals Components
│   │   ├── employee/        # Employee Portal Components
│   │   └── worklog/         # Work Log & Matrix Components
│   ├── services/            # Mock Data & API Contracts
│   └── types/               # TypeScript Type Definitions
├── package.json
└── README.md
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

<p center="align">
  Crafted with ❤️ for <strong>Dayflow Technologies</strong>
</p>

import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute, HRRoute } from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

import Login from "./pages/Login";

import Overview from "./pages/employee/Overview";
import Attendance from "./pages/employee/Attendance";
import Leave from "./pages/employee/Leave";
import Payroll from "./pages/employee/Payroll";
import Profile from "./pages/employee/Profile";

import HROverview from "./pages/hr/HROverview";
import HREmployees from "./pages/hr/HREmployees";
import HREmployeeDetail from "./pages/hr/HREmployeeDetail";
import HRAttendance from "./pages/hr/HRAttendance";
import HRLeaves from "./pages/hr/HRLeaves";
import HRPayroll from "./pages/hr/HRPayroll";

function HomeRoute() {
  const { isHR } = useAuth();
  return isHR ? <HROverview /> : <Overview />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomeRoute />} />
        <Route path="/profile" element={<Profile />} />

        {/* Employee self-service */}
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/payroll" element={<Payroll />} />

        {/* HR only */}
        <Route path="/hr/employees" element={<HRRoute><HREmployees /></HRRoute>} />
        <Route path="/hr/employees/:employeeId" element={<HRRoute><HREmployeeDetail /></HRRoute>} />
        <Route path="/hr/attendance" element={<HRRoute><HRAttendance /></HRRoute>} />
        <Route path="/hr/leaves" element={<HRRoute><HRLeaves /></HRRoute>} />
        <Route path="/hr/payroll" element={<HRRoute><HRPayroll /></HRRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

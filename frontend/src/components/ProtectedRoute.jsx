import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export function HRRoute({ children }) {
  const { token, isHR } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  if (!isHR) return <Navigate to="/" replace />;
  return children;
}

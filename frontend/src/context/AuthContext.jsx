import { createContext, useContext, useState, useCallback } from "react";
import { api, setSession, clearSession, getStoredUser, getToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(getToken());

  const login = useCallback(async (email, password) => {
    const data = await api.login(email, password);
    setSession(data.access_token, data.user);
    setToken(data.access_token);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
  }, []);

  const isHR = user?.role === "HR";

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isHR }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

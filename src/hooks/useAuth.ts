"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, UserRole, LoginCredentials, SignupCredentials } from "@/types/auth";
import { AuthService } from "@/services/auth.service";
import { initStorage } from "@/services/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => void;
  signup: (credentials: SignupCredentials) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initStorage();
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = (credentials: LoginCredentials) => {
    const response = AuthService.login(credentials);
    setUser(response.user);
  };

  const signup = (credentials: SignupCredentials) => {
    const response = AuthService.signup(credentials);
    setUser(response.user);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    const updated = AuthService.switchRole(role);
    if (updated) {
      setUser({ ...updated });
    }
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { user, isLoading, login, signup, logout, switchRole } },
    children
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

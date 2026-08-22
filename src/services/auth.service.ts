import { User, LoginCredentials, SignupCredentials, AuthResponse } from "@/types/auth";
import { getStorage, setStorage, KEYS } from "./api";
import { Employee } from "@/types/employee";

export const AuthService = {
  getCurrentUser(): User | null {
    return getStorage<User | null>(KEYS.AUTH_USER, {
      id: "emp-102",
      name: "Alex Rivera",
      email: "alex.rivera@dayflow.io",
      role: "admin",
      department: "Engineering",
      designation: "VP of Technology",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    });
  },

  login(credentials: LoginCredentials): AuthResponse {
    const employees = getStorage<Employee[]>(KEYS.EMPLOYEES, []);
    let matched = employees.find((emp) => emp.email.toLowerCase() === credentials.email.toLowerCase());

    const role = credentials.rolePreference || matched?.role || "admin";
    const user: User = matched
      ? {
          id: matched.id,
          name: matched.name,
          email: matched.email,
          role: role,
          avatarUrl: matched.avatarUrl,
          employeeId: matched.id,
          department: matched.department,
          designation: matched.designation,
        }
      : {
          id: role === "admin" ? "emp-102" : "emp-101",
          name: role === "admin" ? "Alex Rivera" : "Sarah Jenkins",
          email: credentials.email || (role === "admin" ? "alex.rivera@dayflow.io" : "sarah.jenkins@dayflow.io"),
          role: role,
          department: role === "admin" ? "Engineering" : "Engineering",
          designation: role === "admin" ? "VP of Technology" : "Senior Lead Architect",
          avatarUrl:
            role === "admin"
              ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
              : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        };

    setStorage(KEYS.AUTH_USER, user);
    return { user, token: "mock-jwt-token-dayflow-12345" };
  },

  signup(credentials: SignupCredentials): AuthResponse {
    const newEmpId = `emp-${Date.now()}`;
    const newUser: User = {
      id: newEmpId,
      name: credentials.name,
      email: credentials.email,
      role: credentials.role,
      department: credentials.department,
      designation: credentials.designation,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
    };

    // Add to employees list
    const employees = getStorage<Employee[]>(KEYS.EMPLOYEES, []);
    const newEmployee: Employee = {
      id: newEmpId,
      employeeCode: `DF-${Math.floor(1000 + Math.random() * 9000)}`,
      name: credentials.name,
      email: credentials.email,
      phone: "+1 (555) 000-0000",
      department: credentials.department as any,
      designation: credentials.designation,
      joiningDate: new Date().toISOString().split("T")[0],
      status: "Active",
      avatarUrl: newUser.avatarUrl!,
      role: credentials.role,
      salary: 95000,
      location: "San Francisco, CA",
      emergencyContact: {
        name: "Emergency Contact",
        relationship: "Family",
        phone: "+1 (555) 999-9999",
      },
    };

    setStorage(KEYS.EMPLOYEES, [newEmployee, ...employees]);
    setStorage(KEYS.AUTH_USER, newUser);

    return { user: newUser, token: "mock-jwt-token-dayflow-new" };
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(KEYS.AUTH_USER);
    }
  },

  switchRole(role: "admin" | "employee"): User | null {
    const current = this.getCurrentUser();
    if (!current) return null;
    const updated: User = {
      ...current,
      role: role,
      id: role === "admin" ? "emp-102" : "emp-101",
      name: role === "admin" ? "Alex Rivera" : "Sarah Jenkins",
      email: role === "admin" ? "alex.rivera@dayflow.io" : "sarah.jenkins@dayflow.io",
      avatarUrl:
        role === "admin"
          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
          : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    };
    setStorage(KEYS.AUTH_USER, updated);
    return updated;
  },
};

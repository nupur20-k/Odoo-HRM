export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  employeeId?: string;
  department?: string;
  designation?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  rolePreference?: UserRole;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  department: string;
  designation: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

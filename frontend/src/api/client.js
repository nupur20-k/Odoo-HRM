const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const TOKEN_KEY = "dayflow_token";
const USER_KEY = "dayflow_user";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new ApiError(
      "Can't reach the Dayflow server. Check that the backend is running.",
      0
    );
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no body
  }

  if (!res.ok) {
    if (res.status === 401) {
      clearSession();
    }
    throw new ApiError(
      data?.message || `Request failed (${res.status})`,
      res.status
    );
  }

  return data;
}

export const api = {
  login: (email, password) =>
    request("/api/auth/login", {
      method: "POST",
      body: { email, password },
      auth: false,
    }),

  getMyProfile: () => request("/api/employee/me"),

  checkIn: () => request("/api/attendance/check-in", { method: "POST" }),
  checkOut: () => request("/api/attendance/check-out", { method: "POST" }),
  getMyAttendance: () => request("/api/attendance/me"),

  createLeave: (payload) =>
    request("/api/leave", { method: "POST", body: payload }),
  getMyLeaves: () => request("/api/leave/me"),

  getMyPayroll: () => request("/api/payroll/me"),

  // HR only
  hrGetLeaves: () => request("/api/hr/leaves"),
  hrUpdateLeave: (id, status, hr_comment) =>
    request(`/api/hr/leaves/${id}`, {
      method: "PUT",
      body: { status, hr_comment },
    }),
  hrGetPayroll: () => request("/api/hr/payroll"),
  hrGetEmployees: () => request("/api/hr/employees"),
  hrGetEmployee: (employeeId) => request(`/api/hr/employees/${employeeId}`),
  hrGetAttendance: () => request("/api/hr/attendance"),
};

export { ApiError };

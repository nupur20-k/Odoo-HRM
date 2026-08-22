import { INITIAL_EMPLOYEES, INITIAL_ATTENDANCE, INITIAL_LEAVES, INITIAL_PAYSLIPS } from "@/lib/constants";

const KEYS = {
  EMPLOYEES: "dayflow_employees",
  ATTENDANCE: "dayflow_attendance",
  LEAVES: "dayflow_leaves",
  PAYSLIPS: "dayflow_payslips",
  AUTH_USER: "dayflow_auth_user",
  CLOCK_STATE: "dayflow_clock_state",
};

export const getStorage = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return fallback;
  }
};

export const setStorage = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage`, error);
  }
};

export const initStorage = () => {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(KEYS.EMPLOYEES)) {
    setStorage(KEYS.EMPLOYEES, INITIAL_EMPLOYEES);
  }
  if (!localStorage.getItem(KEYS.ATTENDANCE)) {
    setStorage(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  }
  if (!localStorage.getItem(KEYS.LEAVES)) {
    setStorage(KEYS.LEAVES, INITIAL_LEAVES);
  }
  if (!localStorage.getItem(KEYS.PAYSLIPS)) {
    setStorage(KEYS.PAYSLIPS, INITIAL_PAYSLIPS);
  }
};

export { KEYS };

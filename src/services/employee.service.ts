import { Employee } from "@/types/employee";
import { getStorage, setStorage, KEYS } from "./api";
import { INITIAL_EMPLOYEES } from "@/lib/constants";

export const EmployeeService = {
  getAll(): Employee[] {
    return getStorage<Employee[]>(KEYS.EMPLOYEES, INITIAL_EMPLOYEES);
  },

  getById(id: string): Employee | undefined {
    const list = this.getAll();
    return list.find((e) => e.id === id);
  },

  create(data: Omit<Employee, "id" | "employeeCode">): Employee {
    const list = this.getAll();
    const newEmp: Employee = {
      ...data,
      id: `emp-${Date.now()}`,
      employeeCode: `DF-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    const updated = [newEmp, ...list];
    setStorage(KEYS.EMPLOYEES, updated);
    return newEmp;
  },

  update(id: string, updates: Partial<Employee>): Employee | null {
    const list = this.getAll();
    const index = list.findIndex((e) => e.id === id);
    if (index === -1) return null;

    const updatedEmployee = { ...list[index], ...updates };
    list[index] = updatedEmployee;
    setStorage(KEYS.EMPLOYEES, list);
    return updatedEmployee;
  },

  delete(id: string): boolean {
    const list = this.getAll();
    const filtered = list.filter((e) => e.id !== id);
    setStorage(KEYS.EMPLOYEES, filtered);
    return true;
  },
};

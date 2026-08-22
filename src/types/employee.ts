export type EmployeeStatus = 'Active' | 'On Leave' | 'Terminated' | 'Probation';
export type Department = 'Engineering' | 'Human Resources' | 'Marketing' | 'Sales' | 'Design' | 'Finance';

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Employee {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
  designation: string;
  joiningDate: string;
  status: EmployeeStatus;
  avatarUrl: string;
  role: 'admin' | 'employee';
  salary: number;
  location: string;
  managerName?: string;
  emergencyContact: EmergencyContact;
  dob?: string;
  address?: string;
}

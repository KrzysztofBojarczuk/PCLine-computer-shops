import { EmployeePosition } from "../enums/employeePosition "

export interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    salary: number;
    email: string;
    employeePosition: EmployeePosition;
    shopId: number
}
import { EmployeePosition } from "../enums/employeePosition ";

export interface EmployeeCreate {
    firstName: string;
    lastName: string;
    salary: number;
    email: string;
    employeePosition: EmployeePosition;
    shopId: number

}
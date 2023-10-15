import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeCreate } from '../models/employee-create';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://localhost:7068/api/';

  constructor(private http: HttpClient) { }

  getNumberOfEmployee(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'Employee/GetNumberOfEmployees');
  }

  getEmployees(searchTerm?: string, selectedEmployees?: number[]): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}Employee/Get?searchString=${searchTerm}&${selectedEmployees?.map(employee => `enumEmployeePosition=${employee}`).join('&')}`);
  }

  deleteEmployees(shopId: number, employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}Employee/Delete/${shopId}/employee/${employeeId}`);
  }

  postEmployeeForShop(shopId: number, employee: EmployeeCreate): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}Employee/Post/${shopId}`, employee);
  }
}

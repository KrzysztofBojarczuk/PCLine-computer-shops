import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taskemployee } from '../models/employeetask';
import { Observable } from 'rxjs';
import { TaskemployeeCreate } from '../models/employeetask-create';
import { clippingParents } from '@popperjs/core';

@Injectable({
  providedIn: 'root'
})
export class TaskemployeeService {

  private apiUrl = 'https://localhost:7068/api/';

  constructor(private http: HttpClient) { }

  getTaskEmployeeService(searchTerm?: string): Observable<Taskemployee[]> {
    return this.http.get<Taskemployee[]>(`${this.apiUrl}TaskEmployee/Get?searchTerm=${searchTerm}`);
  }

  createTaskEmployee(taskEmployeeData: Taskemployee): Observable<TaskemployeeCreate> {
    return this.http.post<TaskemployeeCreate>(`${this.apiUrl}TaskEmployee/Create`, taskEmployeeData);
  }

  updateTaskEmployee(taskEmployeeId: number, updateTaskEmployee: Taskemployee): Observable<TaskemployeeCreate> {
    console.log("SSSSS")
    return this.http.put<TaskemployeeCreate>(`${this.apiUrl}TaskEmployee/Put/${taskEmployeeId}`, updateTaskEmployee);
  }

  deleteTaskEmployee(taskEmployeeId: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}TaskEmployee/Delete/${taskEmployeeId}`);
  }
}

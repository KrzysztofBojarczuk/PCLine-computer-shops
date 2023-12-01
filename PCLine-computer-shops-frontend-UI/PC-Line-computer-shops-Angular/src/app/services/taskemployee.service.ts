import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taskemployee } from '../models/employeetask';
import { Observable } from 'rxjs';
import { TaskemployeeCreate } from '../models/employeetask-create';

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

  updateTaskEmployee(taskEmployeeId: number, updatedData: Taskemployee): Observable<TaskemployeeCreate> {
    return this.http.put<TaskemployeeCreate>(`${this.apiUrl}TaskEmployee/Update/${taskEmployeeId}`, updatedData);
  }

  deleteTaskEmployee(taskEmployeeId: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}TaskEmployee/Delete/${taskEmployeeId}`);
  }
}

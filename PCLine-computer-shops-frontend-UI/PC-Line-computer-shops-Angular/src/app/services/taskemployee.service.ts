import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taskemployee } from '../models/employeetask';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskemployeeService {

  private apiUrl = 'https://localhost:7068/api/';

  constructor(private http: HttpClient) { }

  getTaskEmployeeService(searchTerm?: string): Observable<Taskemployee[]> {
    return this.http.get<Taskemployee[]>(`${this.apiUrl}TaskEmployee/Get?searchTerm=${searchTerm}`);
  }
}

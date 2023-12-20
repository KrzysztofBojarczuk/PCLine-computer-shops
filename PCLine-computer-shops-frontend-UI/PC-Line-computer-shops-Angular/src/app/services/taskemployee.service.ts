import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taskemployee } from '../models/employeetask';
import { Observable } from 'rxjs';
import { TaskemployeeCreate } from '../models/employeetask-create';
import { TaskFiles } from '../models/task-files';

@Injectable({
  providedIn: 'root',
})
export class TaskemployeeService {
  private apiUrl = 'https://localhost:7068/api/';

  constructor(private http: HttpClient) {}

  getTaskEmployeeService(searchTerm?: string): Observable<Taskemployee[]> {
    return this.http.get<Taskemployee[]>(
      `${this.apiUrl}TaskEmployee/Get?searchTerm=${searchTerm}`
    );
  }

  createTaskEmployee(
    taskEmployeeData: Taskemployee
  ): Observable<TaskemployeeCreate> {
    const formData = new FormData();
    formData.append(
      'taskCreatedDate',
      taskEmployeeData.taskCreatedDate.toISOString()
    );
    formData.append('title', taskEmployeeData.title);
    formData.append('description', taskEmployeeData.description);
    formData.append('timeEstimated', taskEmployeeData.timeEstimated.toString());
    formData.append('taskStatus', taskEmployeeData.taskStatus.toString());
    formData.append('nameEmployee', taskEmployeeData.nameEmployee);

    if (taskEmployeeData.files && taskEmployeeData.files.length > 0) {
      for (let i = 0; i < taskEmployeeData.files.length; i++) {
        formData.append('files', taskEmployeeData.files[i]);
      }
    }

    return this.http.post<TaskemployeeCreate>(
      `${this.apiUrl}TaskEmployee/Post`,
      formData
    );
  }

  updateTaskEmployee(
    taskEmployeeId: number,
    updateTaskEmployee: Taskemployee
  ): Observable<TaskemployeeCreate> {
    return this.http.put<TaskemployeeCreate>(
      `${this.apiUrl}TaskEmployee/Put/${taskEmployeeId}`,
      updateTaskEmployee
    );
  }

  deleteTaskEmployee(taskEmployeeId: number): Observable<number> {
    return this.http.delete<number>(
      `${this.apiUrl}TaskEmployee/Delete/${taskEmployeeId}`
    );
  }

  getTaskFilesByEmployeeId(taskEmployeeId: number): Observable<TaskFiles[]> {
    return this.http.get<TaskFiles[]>(
      `${this.apiUrl}TaskEmployee/GetTaskFiles/${taskEmployeeId}`
    );
  }

  deleteFileService(
    taskEmployeeId: number,
    fileId: number
  ): Observable<number> {
    return this.http.delete<number>(
      `${this.apiUrl}TaskEmployee/Delete/TaskFile/${taskEmployeeId}/${fileId}`
    );
  }

  addFilesToTaskEmployee(
    taskEmployeeId: number,
    files: File[]
  ): Observable<void> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    return this.http.post<void>(
      `${this.apiUrl}TaskEmployee/AddFiles/${taskEmployeeId}`,
      formData
    );
  }
}

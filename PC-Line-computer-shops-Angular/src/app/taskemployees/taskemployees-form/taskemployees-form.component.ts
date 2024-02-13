import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { clippingParents } from '@popperjs/core';
import { TaskStatus } from 'src/app/enums/taskStatus';
import { Employee } from 'src/app/models/employee';
import { Taskemployee } from 'src/app/models/employeetask';
import { TaskemployeeCreate } from 'src/app/models/employeetask-create';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskemployeeService } from 'src/app/services/taskemployee.service';

@Component({
  selector: 'app-taskemployees-form',
  templateUrl: './taskemployees-form.component.html',
  styleUrls: ['./taskemployees-form.component.scss'],
})
export class TaskemployeesFormComponent {
  taskEmployeeForm: FormGroup;
  selectedFiles: File[] = [];
  employees: Employee[] = [];

  taskStatuses: { value: TaskStatus; name: string }[] = [
    { value: TaskStatus.Todo, name: 'Todo' },
    { value: TaskStatus.Progress, name: 'In Progress' },
    { value: TaskStatus.Done, name: 'Done' },
  ];

  title = 'Create Task';

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskemployeeService,
    public dialogRef: MatDialogRef<TaskemployeesFormComponent>,
    private employeeService: EmployeeService
  ) {
    this.taskEmployeeForm = this.formBuilder.group({
      taskCreatedDate: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      timeEstimated: ['', Validators.required],
      taskStatus: ['', Validators.required],
      nameEmployee: ['', Validators.required],
      files: [''],
    });

    this.getEmployee();
  }

  submit(taskEmployee: Taskemployee) {
    taskEmployee.files = this.selectedFiles;
    this.taskService.createTaskEmployee(taskEmployee).subscribe();
    this.dialogRef.close();
  }

  getEmployee() {
    this.employeeService
      .getEmployeesService('')
      .subscribe((result: Employee[]) => {
        this.employees = result;
      });
  }

  onFileChange(event: any) {
    const files: File[] = event.target.files;
    this.selectedFiles = Array.from(files);
  }
}

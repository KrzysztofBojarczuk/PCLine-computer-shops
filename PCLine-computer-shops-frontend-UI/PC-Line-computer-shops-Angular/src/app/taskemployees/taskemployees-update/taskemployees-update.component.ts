import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskemployeeService } from 'src/app/services/taskemployee.service';
import { TaskemployeesFormComponent } from '../taskemployees-form/taskemployees-form.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Taskemployee } from 'src/app/models/employeetask';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskStatus } from 'src/app/enums/taskStatus';
import { TaskFiles } from 'src/app/models/task-files';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-taskemployees-update',
  templateUrl: './taskemployees-update.component.html',
  styleUrls: ['./taskemployees-update.component.scss'],
})
export class TaskemployeesUpdateComponent {
  title = 'Update Task';

  taskEmployeeForm: FormGroup;

  employees: Employee[] = [];
  selectedFiles: File[] = [];
  taskFilesMap: { [taskId: number]: TaskFiles[] } = {};

  taskStatuses: { value: TaskStatus; name: string }[] = [
    { value: TaskStatus.Todo, name: 'Todo' },
    { value: TaskStatus.Progress, name: 'In Progress' },
    { value: TaskStatus.Done, name: 'Done' },
  ];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private taskService: TaskemployeeService,
    public dialogRef: MatDialogRef<TaskemployeesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public taskEmployee: Taskemployee
  ) {
    this.taskEmployeeForm = this.formBuilder.group({
      taskCreatedDate: [taskEmployee.taskCreatedDate, Validators.required],
      title: [taskEmployee.title, Validators.required],
      description: [taskEmployee.description, Validators.required],
      timeEstimated: [taskEmployee.timeEstimated, Validators.required],
      taskStatus: [taskEmployee.taskStatus, Validators.required],
      nameEmployee: [taskEmployee.nameEmployee, Validators.required],
      files: [''],
    });
    this.getEmployee();
  }

  updateTaskEmployee(taskEmployee: Taskemployee) {
    this.taskService
      .updateTaskEmployee(this.taskEmployee.taskId, taskEmployee)
      .subscribe();

    taskEmployee.files = this.selectedFiles;

    this.taskService
      .addFilesToTaskEmployee(this.taskEmployee.taskId, taskEmployee.files)
      .subscribe();

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

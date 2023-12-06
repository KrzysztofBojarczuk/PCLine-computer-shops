import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskemployeeService } from 'src/app/services/taskemployee.service';
import { TaskemployeesFormComponent } from '../taskemployees-form/taskemployees-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Taskemployee } from 'src/app/models/employeetask';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskStatus } from 'src/app/enums/taskStatus';

@Component({
  selector: 'app-taskemployees-update',
  templateUrl: './taskemployees-update.component.html',
  styleUrls: ['./taskemployees-update.component.scss'],
})
export class TaskemployeesUpdateComponent {
  title = 'Update Task';

  taskEmployeeForm: FormGroup;

  employees: Employee[] = [];

  taskStatuses: { value: TaskStatus; name: string }[] = [
    { value: TaskStatus.Todo, name: 'Todo' },
    { value: TaskStatus.Progress, name: 'In Progress' },
    { value: TaskStatus.Done, name: 'Done' },
  ];

  constructor(
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
      timeEstimated: [taskEmployee.timeEstiamted, Validators.required],
      taskStatus: [taskEmployee.taskStatus, Validators.required],
      nameEmployee: [taskEmployee.nameEmployee, Validators.required],
    });
    console.log(taskEmployee);
    this.getEmployee();
  }

  updateTaskEmployee(taskEmployee: Taskemployee) {
    this.taskService
      .updateTaskEmployee(this.taskEmployee.taskId, taskEmployee)
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
}

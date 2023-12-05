import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { clippingParents } from '@popperjs/core';
import { TaskStatus } from 'src/app/enums/taskStatus';
import { Taskemployee } from 'src/app/models/employeetask';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskemployeeService } from 'src/app/services/taskemployee.service';

@Component({
  selector: 'app-taskemployees-form',
  templateUrl: './taskemployees-form.component.html',
  styleUrls: ['./taskemployees-form.component.scss']
})
export class TaskemployeesFormComponent {

  taskEmployeeForm: FormGroup;

  taskStatuses: { value: TaskStatus; name: string }[] = [
    { value: TaskStatus.Todo, name: 'Todo' },
    { value: TaskStatus.Progress, name: 'In Progress' },
    { value: TaskStatus.Done, name: 'Done' }
  ];
  
  title = "Create Task"

  constructor(private formBuilder: FormBuilder, private taskService: TaskemployeeService, public dialogRef: MatDialogRef<TaskemployeesFormComponent>, private employeeService: EmployeeService) {
    this.taskEmployeeForm = this.formBuilder.group({
      taskCreatedDate: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      timeEstimated: ['', Validators.required],
      taskStatus: ['', Validators.required]
    });

    this.getAllEmployee();
  }

  getAllEmployee(){
    this.employeeService.getEmployeesService().subscribe(result => {
      console.log(result)
    })
  }

  submit(taskEmployee: Taskemployee) {
    this.taskService.createTaskEmployee(taskEmployee).subscribe();
    this.dialogRef.close();
  }
}

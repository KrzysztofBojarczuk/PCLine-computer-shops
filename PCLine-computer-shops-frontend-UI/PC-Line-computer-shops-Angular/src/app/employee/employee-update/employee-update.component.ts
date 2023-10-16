import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeePosition } from 'src/app/enums/employeePosition ';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent {

  employeeForm: FormGroup;

  title = "Update Employee"

  employeePosition = [
    { number: EmployeePosition.Menager, name: "Menager" },
    { number: EmployeePosition.Seller, name: "Seller " },
    { number: EmployeePosition.Technician, name: "Techniciane" },
    { number: EmployeePosition.OfficeWorker, name: "Office worker" },
    { number: EmployeePosition.Driver, name: "Driver" }
  ]

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) {

    this.employeeForm = this.formBuilder.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      salary: [data.salary, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      employeePosition: [data.employeePosition, Validators.required],
    });
  }

  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(this.data.shopId, this.data.employeeId, employee).subscribe(
      () => {
        this.dialogRef.close();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}

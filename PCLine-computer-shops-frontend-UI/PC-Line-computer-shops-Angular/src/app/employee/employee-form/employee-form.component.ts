import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeePosition } from 'src/app/enums/employeePosition ';
import { Employee } from 'src/app/models/employee';
import { EmployeeCreate } from 'src/app/models/employee-create';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {

  title = "Add Eemployee"

  employeeForm: FormGroup;

  employeePosition: { value: number; nameOfposition: string }[] = [
    { value: EmployeePosition.Menager, nameOfposition: 'Menager' },
    { value: EmployeePosition.Seller, nameOfposition: 'Seller' },
    { value: EmployeePosition.Technician, nameOfposition: 'Technician' },
    { value: EmployeePosition.OfficeWorker, nameOfposition: 'Office Worker' },
    { value: EmployeePosition.Driver, nameOfposition: 'Driver' }
  ];

  constructor(private employeeService: EmployeeService, private fb: FormBuilder, private dialogRef: MatDialogRef<EmployeeFormComponent>, @Inject(MAT_DIALOG_DATA) public shopId: number) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      salary: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      employeePosition: ['', Validators.required],
    });
  }

  submit(employee: EmployeeCreate) {
    this.employeeService.postEmployeeForShopService(this.shopId, employee).subscribe(
      () => {
        this.dialogRef.close();
      },
      error => {
        console.error('Error:', error);
      }
    )
  }
}

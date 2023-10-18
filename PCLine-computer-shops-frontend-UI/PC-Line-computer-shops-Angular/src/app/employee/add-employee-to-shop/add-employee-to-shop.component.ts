import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { EmployeePosition } from 'src/app/enums/employeePosition ';
import { Employee } from 'src/app/models/employee';
import { EmployeeCreate } from 'src/app/models/employee-create';
import { Shop } from 'src/app/models/shop';
import { EmployeeService } from 'src/app/services/employee.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-add-employee-to-shop',
  templateUrl: './add-employee-to-shop.component.html',
  styleUrls: ['./add-employee-to-shop.component.scss']
})

export class AddEmployeeToShopComponent {
  employeeForm: FormGroup;
  shopForm: FormGroup;
  shops: Shop[] = [];

  employeePosition: { value: number; nameOfposition: string }[] = [
    { value: EmployeePosition.Menager, nameOfposition: 'Menager' },
    { value: EmployeePosition.Seller, nameOfposition: 'Seller' },
    { value: EmployeePosition.Technician, nameOfposition: 'Technician' },
    { value: EmployeePosition.OfficeWorker, nameOfposition: 'Office Worker' },
    { value: EmployeePosition.Driver, nameOfposition: 'Driver' }
  ];

  constructor(private fb: FormBuilder, private shopService: ShopService, private employeeService: EmployeeService, private dialogRef: MatDialogRef<void>) {
    this.shopForm = this.fb.group({
      shopId: ['', Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      startDate: [{ value: '', disabled: true }, Validators.required],
      country: [{ value: '', disabled: true }, Validators.required]
    });

    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      salary: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      employeePosition: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getShops();
  }

  getShops() {
    this.shopService.getShopsService('').subscribe(
      (result: Shop[]) => {
        this.shops = result;

        console.log(result);
      },
      error => {
        console.error('Błąd podczas pobierania produktów:', error);
      }
    );
  }

  onShopIdChange(event: MatSelectChange) {
    const selectedShopId = event.value;
    const selectedShop = this.shops.find(shop => shop.shopId === selectedShopId);

    if (selectedShop) {
      this.shopForm.patchValue({
        name: selectedShop.name,
        startDate: selectedShop.startDate,
        country: selectedShop.country
      });
    }
  }

  submit(shopId: number, employee: EmployeeCreate) {
    this.employeeService.postEmployeeForShop(shopId, employee).subscribe(res => {
      this.dialogRef.close();
    }
    );
  }
}

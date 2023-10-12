import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressCreate } from 'src/app/models/address-create';
import { ProductFormComponent } from 'src/app/products/product-form/product-form.component';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-adress-form',
  templateUrl: './adress-form.component.html',
  styleUrls: ['./adress-form.component.scss']
})
export class AdressFormComponent {

  addressForm: FormGroup;
  title = "Add Address";

  constructor(private fb: FormBuilder, private addressService: AddressService,
    private dialogRef: MatDialogRef<AdressFormComponent>, @Inject(MAT_DIALOG_DATA) public shopId: number) {

    this.addressForm = this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  submit(address: AddressCreate) {
    this.addressService.postAddressForShop(this.shopId, address).subscribe(
      () => {
        this.dialogRef.close();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}

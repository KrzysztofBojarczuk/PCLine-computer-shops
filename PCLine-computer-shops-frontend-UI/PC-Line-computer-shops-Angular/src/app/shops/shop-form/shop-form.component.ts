import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Country } from 'src/app/enums/country';
import { Shop } from 'src/app/models/shop';
import { ShopCreate } from 'src/app/models/shop-create';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.scss']
})
export class ShopFormComponent {

  shopForm: FormGroup;

  countries: { value: number; name: string }[] = [
    { value: Country.Poland, name: 'Poland' },
    { value: Country.Germany, name: 'Germany' },
    { value: Country.France, name: 'France' }
  ];

  title: string = "Add New Shop";

  constructor(private formBuilder: FormBuilder, private shopService: ShopService, public dialogRef: MatDialogRef<ShopFormComponent>, private snackBar: MatSnackBar) {
    this.shopForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      startDate: ['', Validators.required],
    })
  }

  submit(shop: ShopCreate) {
    this.shopService.postShopService(shop).subscribe();;
    this.dialogRef.close();
  }

}


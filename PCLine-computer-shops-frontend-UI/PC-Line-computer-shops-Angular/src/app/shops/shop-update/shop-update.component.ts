import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-update',
  templateUrl: './shop-update.component.html',
  styleUrls: ['./shop-update.component.scss']
})
export class ShopUpdateComponent {

  shopForm: FormGroup;

  title: string = "Update Shop";

  countries: { value: number; name: string }[] = [
    { value: 1, name: 'Poland' },
    { value: 2, name: 'Germany' },
    { value: 3, name: 'France' }
  ];

  constructor(private formBuilder: FormBuilder, private shopService: ShopService, public dialogRef: MatDialogRef<ShopUpdateComponent>, @Inject(MAT_DIALOG_DATA) public shop: Shop) {
    this.shopForm = this.formBuilder.group({
      name: [shop.name, Validators.required],
      country: [shop.country, Validators.required],
      startDate: [shop.startDate, Validators.required],
    });
  }

  update(shop: Shop) {
    this.shopService.updateShop(this.shop.shopId, shop).subscribe();
    this.dialogRef.close();
  }
}

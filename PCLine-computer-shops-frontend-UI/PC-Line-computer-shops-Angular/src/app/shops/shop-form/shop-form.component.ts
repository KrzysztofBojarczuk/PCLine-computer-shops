import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.scss']
})
export class ShopFormComponent {

  shopForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private shopService: ShopService, public dialogRef: MatDialogRef<ShopFormComponent>) {

    this.shopForm = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      location: ['', Validators.required],
    })
  }

  submit(shop: Shop) {
    this.shopService.postShop(shop).subscribe();
    this.dialogRef.close()
  }

}


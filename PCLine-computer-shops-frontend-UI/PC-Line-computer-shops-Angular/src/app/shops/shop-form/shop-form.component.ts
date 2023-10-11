import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Country } from 'src/app/enums/country';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.scss']
})
export class ShopFormComponent {

  shopForm: FormGroup;

  countries: { value: number; name: string }[] = [
    { value: 1, name: 'Poland' },
    { value: 2, name: 'Germany' },
    { value: 3, name: 'France' }
  ];


  constructor(private formBuilder: FormBuilder, private shopService: ShopService, public dialogRef: MatDialogRef<ShopFormComponent>) {
    this.shopForm = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      country: ['', Validators.required],
    })
  }

  submit(shop: Shop) {
    console.log(shop);

    this.shopService.postShop(shop).subscribe();
    this.dialogRef.close()
  }
}


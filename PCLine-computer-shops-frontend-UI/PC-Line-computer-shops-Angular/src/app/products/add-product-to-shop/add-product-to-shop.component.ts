import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { Shop } from 'src/app/models/shop';
import { ProductService } from 'src/app/services/product.service';
import { ShopService } from 'src/app/services/shop.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatSelectChange } from '@angular/material/select';
import { ProductCreate } from 'src/app/models/product-create';

@Component({
  selector: 'app-add-product-to-shop',
  templateUrl: './add-product-to-shop.component.html',
  styleUrls: ['./add-product-to-shop.component.scss']
})
export class AddProductToShopComponent {
  productForm: FormGroup;
  shopForm: FormGroup;
  shops: Shop[] = [];
  products: Product[] = [];

  constructor(private shopService: ShopService, private fb: FormBuilder, private productService: ProductService, private dialogRef: MatDialogRef<void>) {
    this.shopForm = this.fb.group({
      shopId: ['', Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      startDate: [{ value: '', disabled: true }, Validators.required],
      country: [{ value: '', disabled: true }, Validators.required]
    });

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      amount: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getShops();
  }

  getShops() {
    this.shopService.getShopsService('').subscribe(
      (result: Shop[]) => {
        this.shops = result;
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

  submit(shopId: number, product: ProductCreate) {
    this.productService.postProductForShopService(shopId, product).subscribe(res => {
      this.dialogRef.close();
    }
    );
  }
}

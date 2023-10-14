import { Inject, Component } from '@angular/core';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCreate } from 'src/app/models/product-create';
import { ProductService } from 'src/app/services/product.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  shops: Shop[] = [];
  productForm: FormGroup;

  title = "Add Product"

  constructor(private shopService: ShopService, private fb: FormBuilder, private productService: ProductService, private dialogRef: MatDialogRef<ProductFormComponent>, @Inject(MAT_DIALOG_DATA) public shopId: number) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      amount: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  submit(product: ProductCreate) {
    this.productService.postProductForShop(this.shopId, product).subscribe(
      () => {
        this.dialogRef.close();
      },
      error => {
        console.error('Error:', error);
      }
    );

  }
}

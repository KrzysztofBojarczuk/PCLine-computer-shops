import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductCreate } from 'src/app/models/product-create';
import { VariableBinding } from '@angular/compiler';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent {
  productForm: FormGroup;

  title = 'Update Product';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      amount: [data.amount, Validators.required],
    });
  }

  updateProduct(product: Product) {
    this.productService
      .updateProductService(this.data.shopId, this.data.productId, product)
      .subscribe();
    this.dialogRef.close();
  }
}

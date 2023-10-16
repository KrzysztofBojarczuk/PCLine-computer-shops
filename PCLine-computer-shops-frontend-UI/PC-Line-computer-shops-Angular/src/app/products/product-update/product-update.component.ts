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
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent {
  productForm: FormGroup;

  title = "Update Product"
  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product, shopId: number }) {

    this.productForm = this.fb.group({
      name: [data.product.name, Validators.required],
      price: [data.product.price, Validators.required],
      amount: [data.product.amount, Validators.required],
    });
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(this.data.shopId, this.data.product.productId, product).subscribe();
    this.dialogRef.close();
  }

}

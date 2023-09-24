import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductFormComponent>
  ) {

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  submit(product: any) {
    this.productService.createProduct(product).subscribe();
    this.dialogRef.close();
  }

}

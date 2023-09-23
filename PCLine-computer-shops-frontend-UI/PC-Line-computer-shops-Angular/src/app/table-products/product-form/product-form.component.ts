import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../products-table/product.service';
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
    this.productService.createProduct(product).subscribe(
      response => {
        console.log('Odpowiedź od serwera:', response);
        // Dodaj tutaj dodatkową logikę lub powiadomienia w razie powodzenia
      },
      error => {
        console.error('Błąd podczas wysyłania żądania:', error);
        // Dodaj tutaj obsługę błędu lub powiadomienia w razie niepowodzenia
      }
    );
    this.dialogRef.close();
  }

}

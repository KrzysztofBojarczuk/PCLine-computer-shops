import { Component, OnInit } from '@angular/core';
import { ProductGetDto } from 'src/app/models/product-dto';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})

export class ProductsTableComponent implements OnInit {

  products: Array<ProductGetDto> = [];

  constructor(private productService: ProductService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.error('Błąd podczas pobierania produktów:', error);
      }
    );
  }
  createProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '500px',
      height: '300px'
    });
    this.productService.productAdded.subscribe(() => {
      this.getProducts();
    });
  }
}

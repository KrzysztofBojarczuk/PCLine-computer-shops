import { Component, OnInit } from '@angular/core';
import { ProductGetDto } from 'src/app/models/product-dto';
import { ProductService } from './product.service';
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
    this.productService.getProducts().subscribe(res => {
      this.products = res
    });
  }


  createProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px'
    });
  }
}

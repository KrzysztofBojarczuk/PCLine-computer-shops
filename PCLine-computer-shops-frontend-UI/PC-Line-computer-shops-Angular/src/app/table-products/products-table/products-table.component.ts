import { Component, OnInit } from '@angular/core';
import { ProductGetDto } from 'src/app/models/product-dto';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})

export class ProductsTableComponent implements OnInit {

  products: Array<ProductGetDto> = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products = res
    });
  }
}

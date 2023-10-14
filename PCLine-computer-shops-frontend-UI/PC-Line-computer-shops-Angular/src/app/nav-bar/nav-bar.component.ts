import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  numberOfProducts: number = 0;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getNumberOfProducts();
  }

  getNumberOfProducts() {
    this.productService.getNumberOfProducts().subscribe(
      (count) => {
        this.numberOfProducts = count;
      },
      (error) => {
        console.error('Error fetching number of products:', error);
      }
    );
  }
}

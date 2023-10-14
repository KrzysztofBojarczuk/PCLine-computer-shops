import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { Shop } from 'src/app/models/shop';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product = {} as Product;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private productService: ProductService) {
  }

  updateProduct(product: Product) {
    console.log("dd:", product);
    const dialogRef = this.dialog.open(ProductUpdateComponent, {
      width: '400px',
      height: '450px',
      data: product,
    });
  }
}

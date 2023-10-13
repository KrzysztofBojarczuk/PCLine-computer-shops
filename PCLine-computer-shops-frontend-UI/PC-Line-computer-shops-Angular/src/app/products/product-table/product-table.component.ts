import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ProductUpdateComponent } from '../product-update/product-update.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {

  shops: Shop[] = [];
  products: Product[] = []

  constructor(private shopService: ShopService, private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getShops();
    this.getAllPrducts();
  }

  getTotaNomuberOfPrducts(): number {
    return this.products.reduce((total, product) => total + product.amount, 0);
  }

  getTotalValue(): number {
    return this.products.reduce((total, product) => total + (product.price * product.amount), 0);
  }

  getAllPrducts() {
    this.productService.getProducts().subscribe(
      result => {
        console.log(result);
        this.products = result
      }
    )
  }

  createProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      height: '550px'
    });
    dialogRef.afterClosed();
  }

  getShops() {
    this.shopService.getShops('').subscribe(
      result => {
        this.shops = result;
      },
      error => {
        console.error('Error fetching shops:', error);
      }
    );
  }

  updateProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductUpdateComponent, {
      width: '400px',
      height: '450px',
      data: { product: product, shopId: product.shopId },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllPrducts()
    }
    )
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.shopId, product.productId).subscribe(result => {
      this.getAllPrducts();
    })
  }
}

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
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { AddProductToShopComponent } from '../add-product-to-shop/add-product-to-shop.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  shops: Shop[] = [];
  products: Product[] = []
  productVat: number = 0
  value: string = '';

  constructor(private shopService: ShopService, private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllProducts('');
  }

  addProductToShop() {
    const dialogRef = this.dialog.open(AddProductToShopComponent, {
      width: '900px',
      height: '520px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllProducts('');
    }
    )
  }

  calculateProductVat(productWithVat: number): number {
    const vatRate = 0.23;
    const productWithoutVat = productWithVat / (1 + vatRate);
    return parseFloat(productWithoutVat.toFixed(2));
  }

  getTotaNomuberOfPrducts(): number {
    return this.products.reduce((total, product) => total + product.amount, 0);
  }

  getTotalValue(): number {
    return this.products.reduce((total, product) => total + (product.price * product.amount), 0);
  }

  getAllProducts(searchTerm?: string) {
    this.productService.getProductsService(searchTerm).subscribe(
      (result: Product[]) => {
        this.products = result;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  clearSearch() {
    this.value = '';
    this.getAllProducts('');
  }

  createProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      height: '550px'
    });
    dialogRef.afterClosed();
  }

  updateProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductUpdateComponent, {
      width: '400px',
      height: '450px',
      data: product,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllProducts('')
    }
    )
  }

  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      height: '200px',
      data: {
        titleText: "Delete Product",
        confirmationText: "Do you really want delete Product?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProductService(product.shopId, product.productId).subscribe(result => {
          this.getAllProducts('');
        })
      }
    })
  }

}

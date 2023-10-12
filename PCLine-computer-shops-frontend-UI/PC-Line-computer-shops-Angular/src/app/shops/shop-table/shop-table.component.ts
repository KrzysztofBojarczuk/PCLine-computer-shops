import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';
import { ShopFormComponent } from '../shop-form/shop-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/enums/country';
import { ShopCreate } from 'src/app/models/shop-create';
import { ShopUpdateComponent } from '../shop-update/shop-update.component';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormComponent } from 'src/app/products/product-form/product-form.component';
import { Router } from '@angular/router';
import { AdressFormComponent } from '../adress-form/adress-form.component';

@Component({
  selector: 'app-shop-table',
  templateUrl: './shop-table.component.html',
  styleUrls: ['./shop-table.component.scss']
})
export class ShopTableComponent {

  dataSource: MatTableDataSource<Shop>;

  displayedColumns: string[] = ['shopId', 'name', 'startDate', 'country', 'actions'];

  constructor(private shopService: ShopService, private dialog: MatDialog, private snackBar: MatSnackBar, private productService: ProductService, private router: Router) {
    this.dataSource = new MatTableDataSource<Shop>([]);
  }

  ngOnInit() {
    this.getShops();
  }

  getCountryName(countryValue: number): string {
    return Country[countryValue];
  }

  getShops() {
    this.shopService.getShops().subscribe(
      result => {
        this.dataSource = new MatTableDataSource(result);
        // console.log('Pobrane sklepy:', this.shops);
      },
      error => {
        console.error('Błąd podczas pobierania produktów:', error);
      }
    );
  }

  createShop() {
    const dialogRef = this.dialog.open(ShopFormComponent, {
      width: '400px',
      height: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getShops();
    }
    )
  }

  updateShop(shop: Shop) {
    const dialogRef = this.dialog.open(ShopUpdateComponent, {
      width: '400px',
      height: '450px',
      data: shop,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getShops();
    }
    )
  }

  deleteShop(shopId: number) {
    return this.shopService.deleteShop(shopId).subscribe(result => {
      this.getShops();
      this.snackBar.open('Product deleted successfully', 'Close', {
        duration: 3000,
      });
    });
  }

  createProduct(shopId: number) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      height: '450px',
      data: shopId,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getShops();
    }
    )
  }

  informationsAboutShop(shopId: number) {
    this.router.navigate(['/additional-informations', shopId]);
  }

  createAddress(shopId: number) {
    const dialogRef = this.dialog.open(AdressFormComponent, {
      width: '400px',
      height: '450px',
      data: shopId,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getShops();
    }
    )
  }
}

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

@Component({
  selector: 'app-shop-table',
  templateUrl: './shop-table.component.html',
  styleUrls: ['./shop-table.component.scss']
})
export class ShopTableComponent {

  dataSource: MatTableDataSource<Shop>;

  displayedColumns: string[] = ['shopId', 'name', 'startDate', 'country', 'actions'];

  constructor(private shopService: ShopService, private dialog: MatDialog, private snackBar: MatSnackBar) {
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
}

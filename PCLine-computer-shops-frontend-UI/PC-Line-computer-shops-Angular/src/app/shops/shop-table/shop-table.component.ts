import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';
import { ShopFormComponent } from '../shop-form/shop-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-shop-table',
  templateUrl: './shop-table.component.html',
  styleUrls: ['./shop-table.component.scss']
})
export class ShopTableComponent {

  dataSource: MatTableDataSource<Shop>;

  displayedColumns: string[] = ['shopId', 'name', 'startDate', 'location', 'actions'];

  constructor(private shopService: ShopService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Shop>([]);
  }

  ngOnInit() {
    this.getShops();
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
  createProduct() {
    const dialogRef = this.dialog.open(ShopFormComponent, {
      width: '500px',
      height: '300px'
    });
  }

  deleteShop(shopId: number) {
    return this.shopService.deleteShop(shopId).subscribe(result => {
      this.getShops();
    });
  }
}

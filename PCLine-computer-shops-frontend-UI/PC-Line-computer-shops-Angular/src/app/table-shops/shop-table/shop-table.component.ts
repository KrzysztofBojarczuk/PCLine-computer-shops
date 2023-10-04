import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-table',
  templateUrl: './shop-table.component.html',
  styleUrls: ['./shop-table.component.scss']
})
export class ShopTableComponent {

  dataSource: MatTableDataSource<Shop>;

  displayedColumns: string[] = ['shopId', 'name', 'startDate', 'location'];

  constructor(private shopService: ShopService) {
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

}

import { Component } from '@angular/core';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop-table',
  templateUrl: './shop-table.component.html',
  styleUrls: ['./shop-table.component.scss']
})
export class ShopTableComponent {

  shops: Array<Shop> = [];

  constructor(private shopService: ShopService) {

  }

  ngOnInit() {
    this.getShops();
  }

  getShops() {
    this.shopService.getShops().subscribe(
      result => {
        this.shops = result;
        console.log('Pobrane sklepy:', this.shops);
      },
      error => {
        console.error('Błąd podczas pobierania produktów:', error);
      }
    );
  }

}

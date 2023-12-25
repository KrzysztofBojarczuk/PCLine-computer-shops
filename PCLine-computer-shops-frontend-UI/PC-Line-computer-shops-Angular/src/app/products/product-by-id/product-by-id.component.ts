import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Product } from 'src/app/models/product';
import { Shop } from 'src/app/models/shop';
import { ProductService } from 'src/app/services/product.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-product-by-id',
  templateUrl: './product-by-id.component.html',
  styleUrls: ['./product-by-id.component.scss'],
})
export class ProductByIdComponent {
  shopForm: FormGroup;
  shops: Shop[] = [];
  productsById: Product[] = [];

  constructor(
    private shopService: ShopService,
    private productService: ProductService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.shopForm = this.fb.group({
      shopId: [''],
      name: [{ value: '', disabled: true }],
    });
  }

  ngOnInit() {
    this.getShops();
  }

  clear() {
    this.productService.getProductsByIdService(0, '').subscribe(
      (result: Product[]) => {
        this.productsById = result;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getShops() {
    this.shopService.getShopForProduct().subscribe(
      (result: Shop[]) => {
        this.shops = result;
      },
      (error) => {
        console.error('Błąd podczas pobierania produktów:', error);
      }
    );
  }

  getProductsForShopById() {
    const shopId = this.shopForm.get('shopId')?.value;

    if (shopId) {
      this.productService.getProductsByIdService(shopId, '').subscribe(
        (result: Product[]) => {
          this.productsById = result;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  onShopIdChange(event: MatSelectChange) {
    const selectedShopId = event.value;
    const selectedShop = this.shops.find(
      (shop) => shop.shopId === selectedShopId
    );

    if (selectedShop) {
      this.shopForm.patchValue({
        name: selectedShop.name,
      });
    }
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { Observable, tap } from 'rxjs';
import { Shop } from '../models/shop';
import { ProductCreate } from '../models/product-create';
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productAdded = new EventEmitter<any>();

  private apiUrl = 'https://localhost:7068/api/';

  constructor(private http: HttpClient) { }

  getNumberOfProducts(): Observable<number> {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + "bd1a1ccf8095037f361a4d351e7c0de65f0776bfc2f478ea8d312c763bb6caca");
    return this.http.get<number>(this.apiUrl + 'Product/GetNumberOfProducts', { headers });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'Product/Get');
  }

  postProductForShop(shopId: number, product: ProductCreate): Observable<ProductCreate> {
    return this.http.post<ProductCreate>(`${this.apiUrl}Product/Post/${shopId}`, product);
  }

  updateProduct(shopId: number, productId: number, updatedProduct: ProductCreate): Observable<ProductCreate> {
    return this.http.put<ProductCreate>(`${this.apiUrl}Product/Put/${shopId}/${productId}`, updatedProduct);
  }

  deleteProduct(shopId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}Product/Delete/${shopId}/product/${productId}`);
  }
}
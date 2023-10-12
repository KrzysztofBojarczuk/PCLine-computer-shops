import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { Observable, tap } from 'rxjs';
import { Shop } from '../models/shop';
import { ProductCreate } from '../models/product-create';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productAdded = new EventEmitter<any>();

  private apiUrl = 'https://localhost:7068/api/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'Product/GetAllProducts');
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
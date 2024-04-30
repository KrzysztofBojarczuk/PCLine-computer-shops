import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { Observable, tap } from 'rxjs';
import { Shop } from '../models/shop';
import { ProductCreate } from '../models/product-create';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productAdded = new EventEmitter<any>();

  private apiUrl = 'https://localhost:7068/api/Product/';

  constructor(private http: HttpClient) {}

  getNumberOfProductsService(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'GetNumberOfProducts');
  }

  getProductsService(searchTerm?: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?searchTerm=${searchTerm}`);
  }

  getProductsByIdService(
    shopId: number,
    searchTerm?: string
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}${shopId}?searchTerm=${searchTerm}`
    );
  }

  postProductForShopService(
    shopId: number,
    product: ProductCreate
  ): Observable<ProductCreate> {
    return this.http.post<ProductCreate>(`${this.apiUrl}${shopId}`, product);
  }
  updateProductService(
    shopId: number,
    productId: number,
    updatedProduct: ProductCreate
  ): Observable<ProductCreate> {
    return this.http.put<ProductCreate>(
      `${this.apiUrl}${shopId}/${productId}`,
      updatedProduct
    );
  }

  deleteProductService(shopId: number, productId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}${shopId}/product/${productId}`
    );
  }
}

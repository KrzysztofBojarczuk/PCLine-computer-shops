import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductGetDto } from 'src/app/models/product-dto';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productAdded = new EventEmitter<any>();

  private apiUrl = 'https://localhost:7068/api/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductGetDto[]> {
    return this.http.get<ProductGetDto[]>(this.apiUrl + 'Product/Get');
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Product/Post', product).pipe(
      tap(() => {
        this.productAdded.emit();
      })
    );;
  }
}
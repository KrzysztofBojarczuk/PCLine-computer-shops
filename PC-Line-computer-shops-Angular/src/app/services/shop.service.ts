import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shop } from '../models/shop';
import { Observable } from 'rxjs';
import { ShopCreate } from '../models/shop-create';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private apiUrl = 'https://localhost:7068/api/';

  constructor(private http: HttpClient) { }

  getShopsService(
    pageNumber?: number,
    pageSize?: number,
    searchTerm?: string,
    selectedCountries?: number[]
  ): Observable<Shop[]> {
    return this.http.get<Shop[]>(
      `${this.apiUrl
      }Shops/Get?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}&${selectedCountries
        ?.map((country) => `enumCountry=${country}`)
        .join('&')}`
    );
  }

  getShopForProduct(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${this.apiUrl}Shops/GetAllShopsForProduct`);
  }

  postShopService(shop: ShopCreate): Observable<ShopCreate> {
    return this.http.post<ShopCreate>(this.apiUrl + 'Shops/Post', shop);
  }

  deleteShopService(shopId: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}Shops/Delete/${shopId}`);
  }

  updateShopService(
    shopId: number,
    updatedShop: ShopCreate
  ): Observable<ShopCreate> {
    const startDate = new Date(updatedShop.startDate);
    const timezoneOffset = startDate.getTimezoneOffset();
    startDate.setMinutes(startDate.getMinutes() - timezoneOffset);
    const formattedStartDate = startDate.toISOString();
    return this.http.put<ShopCreate>(`${this.apiUrl}Shops/Put/${shopId}`, {
      ...updatedShop,
      startDate: formattedStartDate,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Address } from '../models/address';
import { AddressCreate } from '../models/address-create';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = 'https://localhost:7068/api/';

  constructor(private http: HttpClient) {}

  getAdrresForShopService(shopId: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}Address/Get/${shopId}`);
  }

  postAddressForShopService(
    shopId: number,
    address: AddressCreate
  ): Observable<AddressCreate> {
    return this.http.post<AddressCreate>(
      `${this.apiUrl}Address/Post/${shopId}`,
      address
    );
  }
}

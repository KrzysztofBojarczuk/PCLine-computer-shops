import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shop } from '../models/shop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private apiUrl = 'https://localhost:7068/api/';

  constructor(private http: HttpClient) { }

  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.apiUrl + 'Shops/Get');
  }
}

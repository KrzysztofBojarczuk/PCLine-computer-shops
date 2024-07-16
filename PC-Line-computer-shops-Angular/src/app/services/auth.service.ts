import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/register';
import { map, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { LoginUser } from '../models/loginUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7068/api/Account/';
  private token: string | null = localStorage.getItem('token');
  private isLoggedInStatus: boolean = !!this.token;

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return this.token;
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedInStatus = value;
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.isLoggedInStatus);
  }

  registerUser(registerUser: RegisterUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register`, registerUser);
  }

  loginUserService(loginUser: LoginUser): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}login`, loginUser)
      .pipe(
        map((response) => {
          this.setToken(response.token);
          this.setLoggedIn(true);
          return response;
        })
      );
  }

  logoutUser(): void {
    this.token = null;
    this.setLoggedIn(false);
    localStorage.removeItem('token');
  }
}

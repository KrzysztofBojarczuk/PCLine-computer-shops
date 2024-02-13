import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/register';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'https://localhost:7068/api/';
  private token: string = '';
  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  public setLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }

  public getLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  registerUserService(registerUser: RegisterUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>(
      this.apiUrl + 'Authenticate/register',
      registerUser
    );
  }

  loginUserService(loginUser: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'Authenticate/login', loginUser);
  }
}

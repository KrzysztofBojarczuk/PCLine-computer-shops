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

  constructor(private http: HttpClient) {}

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

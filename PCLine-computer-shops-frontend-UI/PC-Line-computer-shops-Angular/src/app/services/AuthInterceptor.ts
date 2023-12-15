import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  headers = new HttpHeaders().set(
    'Authorization',
    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjQyOWRlNmNkLTM2MDUtNDJkZi1iNWU4LThiZGU0YjVlZjY0MyIsImV4cCI6MTcwMzE1NTUxOSwiaXNzIjoiaHR0cHM6XFxsb2NhbGhvc3QuY29tIiwiYXVkIjoiaHR0cHM6XFxsb2NhbGhvc3QuY29tIn0.FC5H6JXHqfv6MTQCFkpFIzHP3I1ZcxrKX1eLwRs5ROs`
  );

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      headers: this.headers,
    });

    return next.handle(authReq);
  }
}

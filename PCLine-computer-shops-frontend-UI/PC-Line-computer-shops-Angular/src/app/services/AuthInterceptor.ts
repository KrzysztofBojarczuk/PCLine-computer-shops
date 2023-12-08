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
    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6ImE1NGQxMTEwLTc5NTMtNDg5MS05NGQxLTNhMTZiZmU0NzY2YiIsImV4cCI6MTcwMjU0MTgyNCwiaXNzIjoiaHR0cHM6XFxsb2NhbGhvc3QuY29tIiwiYXVkIjoiaHR0cHM6XFxsb2NhbGhvc3QuY29tIn0.zhchWpljlN_ot5KEjEWgqqF5okrTsgv9eLR5SLZ3bJM`
  );

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      headers: this.headers,
    });

    return next.handle(authReq);
  }
}

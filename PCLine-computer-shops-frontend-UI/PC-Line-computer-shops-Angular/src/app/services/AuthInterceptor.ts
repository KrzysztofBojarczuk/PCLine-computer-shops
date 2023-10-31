import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    headers = new HttpHeaders().set('Authorization', `xxx`);

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authReq = req.clone({
            headers: this.headers
        });

        return next.handle(authReq);
    }
}
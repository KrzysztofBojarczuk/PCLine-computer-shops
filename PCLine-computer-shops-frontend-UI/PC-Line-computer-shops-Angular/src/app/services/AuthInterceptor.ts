import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    //headers = new HttpHeaders().set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjRlNjNjZGJmLTg0N2UtNDRlZC1hZmIwLTJkZjY1YTk4NzdkMSIsImV4cCI6MTY5OTI1MzQ3MywiaXNzIjoiaHR0cHM6XFxsb2NhbGhvc3QuY29tIiwiYXVkIjoiaHR0cHM6XFxsb2NhbGhvc3QuY29tIn0.C8YmrP2ZF98ETaVjbT6I_xLF7Q7YRyT919Vb5-Kb_VQ`);

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authReq = req.clone({
            // headers: this.headers
        });

        return next.handle(authReq);
    }
}
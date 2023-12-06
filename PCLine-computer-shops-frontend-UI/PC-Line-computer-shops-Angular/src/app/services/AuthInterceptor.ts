import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    headers = new HttpHeaders().set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjViZmQ5MjQxLTQ2MmEtNDYxOS04Mzk4LTEyMzI0YjgwMjUyNSIsImV4cCI6MTcwMjQ0ODM0MCwiaXNzIjoiaHR0cHM6XFxsb2NhbGhvc3QuY29tIiwiYXVkIjoiaHR0cHM6XFxsb2NhbGhvc3QuY29tIn0.LBvn-8fcFRS024x-86JN1BH1rIu7BabTI5y06if7NQM`);

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authReq = req.clone({
             headers: this.headers
        });

        return next.handle(authReq);
    }
}
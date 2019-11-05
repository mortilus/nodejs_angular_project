import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = localStorage.getItem('access_token');
        console.log("POROC " + authToken);
        if (authToken) {
            const authRequest = req.clone({
                setHeaders: {
                    Authorisation: authToken
                }
            });
            return next.handle(authRequest);
        } else {
            return next.handle(req);
        }
    }
}
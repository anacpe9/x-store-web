import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private readonly auth: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(catchError(err => {
                if (err.status === 401) {
                    this.auth.logout(); // auto logout if 401 response returned from api
                    location.reload();
                }

                const error = err.error.message || err.statusText;
                return throwError(() =>error);
            }));
    }
}

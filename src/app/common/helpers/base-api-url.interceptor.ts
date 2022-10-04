import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// import { environment } from '../../environments/environment';

@Injectable()
export class BaseApiUrlInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const url = '/api/v1'; // environment.apiUrl;

        // console.log(url + req.url);

        req = req.clone({
            url: url + req.url
        });

        return next.handle(req);
    }
}

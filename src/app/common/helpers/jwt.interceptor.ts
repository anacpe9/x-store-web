import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    token: string | undefined;

    constructor(private readonly auth: AuthenticationService) {
      this.auth.currentUser.subscribe(user => {
        // console.log('\n', '-'.repeat(50), 'this.auth.currentUser.subscribe(user => {\n', user);
        if (!user) return;

        this.token = user.token;
      })
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      // console.log('\n', '+'.repeat(50), '\n', this.token);
      if (typeof this.token === 'string' && this.token.length > 0) {
        request = request.clone({
          setHeaders: {
            'acl-token': `${this.token}`
          }
        });
      }

        return next.handle(request);
    }
}

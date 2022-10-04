import { BaseApiUrlInterceptor } from './common/helpers/base-api-url.interceptor';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './common/helpers/auth.guard';
import { AlertComponent } from './common/share/alert/alert.component';
import { InboxComponent } from './inbox/inbox.component';
import { SearchPipe } from './common/helpers/search.pipe';
import { BookCardComponent } from './common/components/book-card/book-card.component';
import { JwtInterceptor } from './common/helpers/jwt.interceptor';
import { ErrorInterceptor } from './common/helpers/error.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: BookListComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'books/:bookId', component: BookDetailsComponent, canActivate: [AuthGuard] },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      { path: 'inbox', component: InboxComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'shipping', component: ShippingComponent, canActivate: [AuthGuard] },

      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    BookListComponent,
    BookDetailsComponent,
    CartComponent,
    ShippingComponent,
    ProfileComponent,
    RegisterComponent,
    BookCardComponent,
    LoginComponent,
    AlertComponent,
    InboxComponent,
    SearchPipe,
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: JwtInterceptor },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: ErrorInterceptor },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: BaseApiUrlInterceptor },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
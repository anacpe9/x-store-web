import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: BookListComponent },
      { path: 'books/:bookId', component: BookDetailsComponent },

      // { path: 'login', component: BookDetailsComponent },
      // { path: 'sign-up', component: BookDetailsComponent },
      // { path: '**', component: PageNotFoundComponent, data: { title: 'Found Error !!!' } },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    BookListComponent,
    BookDetailsComponent
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
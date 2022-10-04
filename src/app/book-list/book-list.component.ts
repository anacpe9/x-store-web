import { AlertService } from './../common/services/alert.service';
import { BooksService } from './../common/services/books.service';
import { Book } from '../common/models/books';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { take } from 'rxjs';

@Component({
  selector: 'x-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: [ './book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isLoading = false;
  isError = false;

  filterForm = this.formBuilder.group({
    searchBox: '',
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly booksService: BooksService,
    private readonly alertService: AlertService,
  ) { }

  get searchBox(): any {
    return this.filterForm.get('searchBox');
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.isLoading = true;

    this.booksService.getAll()
      .pipe(take(1))
      .subscribe({
        error: (e) => {
          this.isError = true;
          this.alertService.error(e.error?.message || e.statusText || e);
        },
        next: (v) => {
          this.books = v;

          // Sort countries by name A-Z
          this.books.sort((a, b) => a.title.localeCompare(b.title));
        },
        complete: ()=>{
          this.isLoading = false;
        }
      });
      // .subscribe(
      //   (response: Book[] | any) => {
      //     this.isLoading = false;
      //     this.isError = false;

      //     this.books = response;

      //     // Sort countries by name A-Z
      //     this.books.sort((a, b) => a.title.localeCompare(b.title));
      //   },
      //   (error) => {
      //     this.isLoading = false;
      //     this.isError = true;

      //     this.alertService.error(error.error?.message || error.statusText || error);
      //   }
      // );
  }

  share() {
    window.alert('The book has been shared!');
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
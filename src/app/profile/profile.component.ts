import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../common/services/authentication.service';
import { BooksService } from '../common/services/books.service';
import { take } from 'rxjs';
import { AlertService } from '../common/services/alert.service';
import { PurchasedBook } from './../common/models/purchased-books';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'x-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  books: PurchasedBook[] = [];
  isLoading = false;
  isError = false;

  filterForm = this.formBuilder.group({
    searchBox: '',
  });

  get searchBox(): any {
    return this.filterForm.get('searchBox');
  }

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly alertService: AlertService,
    private readonly booksService: BooksService,
    private readonly authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.booksService.purchasedList()
      .pipe(take(1))
      .subscribe({
        error: (e) => {
          this.isError = true;
          this.alertService.error(e.error?.message || e.message || e.statusText || e, true);
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
  }

  onSignOut() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}

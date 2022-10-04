import { BooksService } from './../common/services/books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../common/models/books';
import { CartService } from './../common/services/cart.service';
import { take } from 'rxjs';
import { AlertService } from '../common/services/alert.service';

@Component({
  selector: 'x-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cartService: CartService,
    private readonly alertService: AlertService,
    private readonly booksService: BooksService,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('bookId') as string;

    // Find the product that correspond with the id provided in route.
    this.booksService.getById(productIdFromRoute).pipe(take(1)).subscribe({
      error: (e) => {
        this.alertService.error(e.error?.message || e.statusText || e);
      },
      next: (v) => {
        this.book = v;
      },
      complete: ()=>{
      }
    });
  }

  addToCart(book: Book){
    this.cartService.addToCart(book);
    window.alert('Your book has been added to the cart!');
  }

}

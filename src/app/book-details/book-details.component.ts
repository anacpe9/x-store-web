import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book, books } from '../books';
import { CartService } from './../common/services/cart.service';

@Component({
  selector: 'x-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('bookId'));

    // Find the product that correspond with the id provided in route.
    this.book = books.find(book => book.id === productIdFromRoute);
  }

  addToCart(book: Book){
    this.cartService.addToCart(book);
    window.alert('Your book has been added to the cart!');
  }

}

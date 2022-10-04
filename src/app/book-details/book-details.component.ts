import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book, books } from '../books';

@Component({
  selector: 'x-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('bookId'));

    // Find the product that correspond with the id provided in route.
    this.book = books.find(book => book.id === productIdFromRoute);
  }

}

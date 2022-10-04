import { PurchasedBook } from './../../models/purchased-books';
import { Book } from '../../models/books';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'x-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book!: PurchasedBook | Book;
  @Input() isPurchasedBook!: boolean;

  constructor() { }

  get purchaseDate(): number {
    if(!this.isPurchasedBook || !this.book) return 0;

    const pb = this.book as PurchasedBook;
    return pb.purchaseDate;
  }

  ngOnInit(): void {
  }

}

import { Book } from '../../models/books';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'x-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;

  constructor() { }

  ngOnInit(): void {
  }

}

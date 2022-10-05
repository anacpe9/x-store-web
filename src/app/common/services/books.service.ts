import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from '../models/books';
import { Wallet } from '../models/wallet';
import { PurchasedBook } from '../models/purchased-books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private readonly http: HttpClient) { }

  private fetchBooks(uri: string): Observable<Wallet | Book | Book[] | PurchasedBook[]> {
    return this.http
      .get<Book | Book[]>(uri)
      .pipe(map((book) => {
        return book;
      }));
  }

  getAll(): Observable<Book[]> {
    return this.fetchBooks(`/store/books`) as Observable<Book[]>;
  }

  getWallet(): Observable<Wallet> {
    return this.fetchBooks(`/store/wallet`) as Observable<Wallet>;
  }

  getById(id: string): Observable<Book> {
    return this.fetchBooks(`/store/books/${id}`) as Observable<Book>;
  }

  purchasedList(): Observable<PurchasedBook[]> {
    return this.fetchBooks(`/store/purchased`) as Observable<PurchasedBook[]>;
  }

  buy(tx: string, bookIds: string[]) {
    if (bookIds.length === 0) throw new Error('Have not books to buy');
    if (!tx) throw new Error('Transaction is null or undefined');

    return this.http
      .post<any>(`/store/books/buy`, { tx: tx, bookIds: bookIds })
      .pipe(map((res) => {
        return res;
      }));
  }
}

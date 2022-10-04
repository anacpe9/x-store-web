import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from '../models/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private readonly http: HttpClient) { }

  private fetchBooks(uri: string): Observable<Book | Book[]> {
    return this.http
      .get<Book | Book[]>(uri)
      .pipe(map((book) => {
        return book;
      }));
  }
  getAll(): Observable<Book[]> {
    return this.fetchBooks(`/store/books`) as Observable<Book[]>;
  }

  getById(id: string): Observable<Book> {
    return this.fetchBooks(`/store/books/${id}`) as Observable<Book>;
  }

  purchasedList(): Observable<Book[]> {
    return this.fetchBooks(`/store/purchased`) as Observable<Book[]>;
  }

  buy(bookIds: string[]) {
    return this.http
      .post<any>(`/store/books/buy`, bookIds)
      .pipe(map((res) => {
        return res;
      }));
  }
}

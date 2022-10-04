import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/books';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Book[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly authenticationService: AuthenticationService,
  ) {
    const currUser = this.authenticationService.currentUserValue;
    if (currUser) {
      const str = localStorage.getItem(`${currUser.id}:cart-service`) as string;
      if (str) {
        const obj = JSON.parse(str);
        if (obj && Array.isArray(obj)) {
          const books = obj as Book[];
          if(books && books.length>0){
            this.items = books;
          }
        }
      }
    }
  }

  private updateLocaleStorage() {
    const currUser = this.authenticationService.currentUserValue;
    if (currUser) {
      localStorage.setItem(`${currUser.id}:cart-service`, JSON.stringify(this.items));
    }
  }

  addToCart(book: Book){
    this.items.push(book);
    this.updateLocaleStorage();
  }

  getItems() {
    return this.items;
  }

  clearCart(){
    this.items.splice(0);
    this.updateLocaleStorage();

    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }
}

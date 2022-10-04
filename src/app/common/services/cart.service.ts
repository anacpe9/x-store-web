import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './../../books';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Book[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  addToCart(book: Book){
    this.items.push(book);
  }

  getItems() {
    return this.items;
  }

  clearCart(){
    this.items.splice(0);
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }
}

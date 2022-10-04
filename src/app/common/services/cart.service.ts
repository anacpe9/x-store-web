import { Book } from './../../books';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Book[] = [];

  constructor() { }

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
}

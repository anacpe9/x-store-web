import { Book } from "./books";

export interface PurchasedBook extends Book {
  purchaseDate: number;
}
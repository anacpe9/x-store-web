import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../common/services/books.service';
import { CartService } from '../common/services/cart.service';
import { AlertService } from '../common/services/alert.service';

@Component({
  selector: 'x-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  checkoutForm = this.formBuilder.group({});

  constructor(
    private readonly router: Router,
    private readonly alertService: AlertService,
    private readonly cartService: CartService,
    private readonly booksService: BooksService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const books = this.cartService.getItems();
    if(books.length === 0) return;

    if(!window.confirm('Press OK button to confirm to purchasing')) return;

    this.booksService.buy(books.map((b) => b.id))
      .pipe(take(1))
      .subscribe({
        error: (e) => {
          this.alertService.error(e.error?.message || e.statusText || e);
        },
        next: () => {
          // Process checkout data here
          this.items = this.cartService.clearCart();
          this.checkoutForm.reset();

          const txt = 'Your order has been submitted';
          this.alertService.success(txt, true);
          // this.router.navigate(['/profile']);
        },
        complete: () => {
        }
      });
  }
}

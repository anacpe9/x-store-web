import { firstValueFrom, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../common/services/books.service';
import { CartService } from '../common/services/cart.service';
import { AlertService } from '../common/services/alert.service';
import { ContractService } from '../common/services/contract.service';

@Component({
  selector: 'x-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  checkoutForm = this.formBuilder.group({});
  process = false;

  constructor(
    private readonly router: Router,
    private readonly alertService: AlertService,
    private readonly cartService: CartService,
    private readonly booksService: BooksService,
    private readonly formBuilder: FormBuilder,
    private readonly contractService: ContractService,
  ) { }

  ngOnInit(): void {
  }

  async onWallet() {
    this.process = true;
    try {
      await this.contractService.connectAccount();
    } catch (e: any) {
      this.alertService.error(e.error?.message || e.message || e.statusText || e, true);
    }

    this.process = false;
  }

  async onDisconnectWallet() {
    this.process = true;
    try {
      await this.contractService.disconnectAccount();
    } catch (e: any) {
      this.alertService.error(e.error?.message || e.message || e.statusText || e, true);
    }

    this.process = false;
  }

  // async onSend() {
  //   const wallet = await firstValueFrom(this.booksService.getWallet());
  //   const result = await this.contractService.sendEth(wallet.address, '0.01');
  //   console.log('onSend(): ', result);
  // }

  onClearCart() {
    const books = this.cartService.getItems();
    if(books.length === 0) return;

    this.process = true;
    if(!window.confirm('Are you sure to clear cart')) return;

    this.cartService.clearCart();
    this.process = false;
  }

  get currentWalletAccount(): string {
    return this.contractService.currentAccount;
  }

  get summaryPrice(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  async onSubmit(): Promise<void> {
    try {
      this.process = true;
      const books = this.cartService.getItems();
      if (books.length === 0) return;

      if (!window.confirm('Press OK button to confirm to purchasing')) return;

      const sumPrice = this.summaryPrice / 1000;
      const wallet = await firstValueFrom(this.booksService.getWallet());
      const result = await this.contractService.sendEth(wallet.address, sumPrice.toFixed(2)); // '0.01');
      console.log('onSend():')
      console.log(result);

      await firstValueFrom(this.booksService.buy(result.transactionHash, books.map((b) => b.id)));
      this.items = this.cartService.clearCart();
      this.checkoutForm.reset();

      const txt = 'Your order has been submitted';
      this.alertService.success(txt, true);
    } catch (e: any) {
      this.alertService.error(e.error?.message || e.message || e.statusText || e, true);
    }

    this.process = false;
  }
}

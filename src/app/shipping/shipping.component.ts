import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CartService } from './../common/services/cart.service';

@Component({
  selector: 'x-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  shippingCosts!: Observable<{ type: string, price: number }[]>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.shippingCosts =  this.cartService.getShippingPrices();
  }

}

import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  selectedItems: any = [];

  total = 0;

  constructor(private readonly cartService: CartService) {
  }

  ngOnInit(): void {
    const items = this.cartService.getCart();
    const selected: any = {};
    for (const item of items) {
      const obj: any = item;
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = {...obj, count: 1};
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key]);
    this.total = this.selectedItems.reduce((a: any, b: any) => a + (b.count * b.price), 0);
  }

}

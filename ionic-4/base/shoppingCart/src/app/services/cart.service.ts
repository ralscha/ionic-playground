import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
    {id: 0, name: 'Pizza Salami', price: 8.99, amount: 1},
    {id: 1, name: 'Pizza Classic', price: 5.49, amount: 1},
    {id: 2, name: 'Sliced Bread', price: 4.99, amount: 1},
    {id: 3, name: 'Salad', price: 6.99, amount: 1}
  ];

  private cart: Product[] = [];
  private cartItemCount = new BehaviorSubject(0);

  getProducts(): Product[] {
    return this.data;
  }

  getCart(): Product[] {
    return this.cart;
  }

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  addProduct(product: Product): void{
    let added = false;
    for (const p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product: Product): void {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount === 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product: Product): void {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}

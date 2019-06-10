import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private data = [
    {
      category: 'Pizza',
      expanded: true,
      products: [
        {id: 0, name: 'Salami', price: '8'},
        {id: 1, name: 'Classic', price: '5'},
        {id: 2, name: 'Tuna', price: '9'},
        {id: 3, name: 'Hawai', price: '7'}
      ]
    },
    {
      category: 'Pasta',
      products: [
        {id: 4, name: 'Mac & Cheese', price: '8'},
        {id: 5, name: 'Bolognese', price: '6'}
      ]
    },
    {
      category: 'Salad',
      products: [
        {id: 6, name: 'Ham & Egg', price: '8'},
        {id: 7, name: 'Basic', price: '5'},
        {id: 8, name: 'Ceaser', price: '9'}
      ]
    }
  ];

  private cart = [];

  constructor() {
  }

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.push(product);
  }
}

import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  cart: any = [];
  items: any = [];

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(private readonly router: Router,
              private readonly cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
  }

  addToCart(product: any): void {
    this.cartService.addProduct(product);
  }

  openCart(): void {
    this.router.navigate(['cart']);
  }

}

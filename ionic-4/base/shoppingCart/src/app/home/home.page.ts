import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CartService, Product} from '../services/cart.service';
import {ModalController} from '@ionic/angular';
import {CartModalPage} from '../pages/cart-modal/cart-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  cart: Product[] = [];
  products: any = [];
  cartItemCount!: BehaviorSubject<number>;

  @ViewChild('cart', {read: ElementRef}) fab!: ElementRef;

  constructor(private cartService: CartService, private modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  addToCart(product: any): void {
    this.cartService.addProduct(product);
    this.animateCSS('tada');
  }

  async openCart(): Promise<void> {
    this.animateCSS('bounceOutLeft', true);

    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  animateCSS(animationName: any, keepAnimated = false): void {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);

    // https://github.com/daneden/animate.css
    function handleAnimationEnd(): void {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }

    node.addEventListener('animationend', handleAnimationEnd);
  }
}

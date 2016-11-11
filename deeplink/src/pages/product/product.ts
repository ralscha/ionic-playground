import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  productId: string;

  constructor(private _params: NavParams) {
    this.productId = _params.get('productId');
  }
}

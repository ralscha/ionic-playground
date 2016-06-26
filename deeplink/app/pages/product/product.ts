import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/product/product.html',
})
export class ProductPage {
  productId: string;
  
  constructor(private _params: NavParams) {
    this.productId = _params.get('productId');
  }
}

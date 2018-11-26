import {Component} from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  masks: any;

  phoneNumber: any = "";
  cardNumber: any = "";
  cardExpiry: any = "";
  orderCode: any = "";

  constructor() {
    this.masks = {
      phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      cardNumber: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      cardExpiry: [/[0-1]/, /\d/, '/', /[1-2]/, /\d/],
      orderCode: [/[a-zA-z]/, ':', /\d/, /\d/, /\d/, /\d/]
    };
  }

  save() {
    const unmaskedData = {
      phoneNumber: this.phoneNumber.replace(/\D+/g, ''),
      cardNumber: this.cardNumber.replace(/\D+/g, ''),
      cardExpiry: this.cardExpiry.replace(/\D+/g, ''),
      orderCode: this.orderCode.replace(/[^a-zA-Z0-9 -]/g, '')
    };

    console.log(unmaskedData);
  }

}

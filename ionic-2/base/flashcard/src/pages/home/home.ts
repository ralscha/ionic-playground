import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  flashCards: any;

  constructor(public navCtrl: NavController) {
    this.flashCards = [
      {front: 'sein', back: 'to be'},
      {front: 'haben', back: 'to have'},
      {front: 'werden', back: 'to become'},
      {front: 'können', back: 'to be able to'},
      {front: 'müssen', back: 'to have to'}
    ];
  }

}

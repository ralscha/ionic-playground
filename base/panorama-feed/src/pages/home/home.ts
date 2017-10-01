import {Component} from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cards: any;
  category: string = 'gear';

  constructor() {
    this.cards = new Array(10);
  }

}

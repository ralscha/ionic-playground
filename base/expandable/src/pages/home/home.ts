import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any = [];
  itemExpanded = false;
  itemExpandHeight = 200;

  constructor(public navCtrl: NavController) {
    this.items = [{expanded: false},
      {expanded: true},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false}]
  }

  expandItem(item) {
    item.expanded = !item.expanded;
  }
}

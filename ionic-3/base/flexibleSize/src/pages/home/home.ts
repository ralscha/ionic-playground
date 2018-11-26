import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  root = 'NewsPage';

  constructor(public navCtrl: NavController) { }

  open(pageName) {
    this.root = pageName;
  }

}

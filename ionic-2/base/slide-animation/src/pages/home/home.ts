import {Component} from '@angular/core';
import {ItemSliding} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shouldAnimate: boolean = true;

  archive(cmp:ItemSliding) {
    cmp.close();
    console.log('do archive');
  }

  unread() {
    console.log('do unread');
  }
}

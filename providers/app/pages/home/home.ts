import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PageOnePage} from '../page-one/page-one';
import {PageTwoPage} from '../page-two/page-two';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  tab1Root: any = PageOnePage;
  tab2Root: any = PageTwoPage;

  constructor(private navController: NavController) {

  }
}

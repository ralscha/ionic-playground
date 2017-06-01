import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SearchPage} from "../search/search";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private readonly nav: NavController) {
  }

  openSearch(){
    this.nav.push(SearchPage);
  }

}

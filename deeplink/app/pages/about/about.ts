import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  thing: string;
  
  constructor(navParams: NavParams) {
    this.thing = navParams.get('t');
  }
}

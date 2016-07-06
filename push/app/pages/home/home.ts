import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

declare var FCMPlugin;

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private token: string;

  constructor(private navController: NavController) {
   
  }
}

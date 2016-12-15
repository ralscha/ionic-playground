import {Component} from '@angular/core';

import {NavController, AlertController} from 'ionic-angular';
import {DragulaService} from "ng2-dragula/components/dragula.provider";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DragulaService]
})
export class HomePage {
  q1 = [];
  q2 = [];

  constructor(private readonly navController: NavController,
              private readonly dragulaService: DragulaService,
              private readonly alertCtrl: AlertController) {

    for (let i = 0; i < 20; i++) {
      this.q1.push("1. <" + i + ">");
      this.q2.push("2. <" + i + ">");
    }

    dragulaService.drop.subscribe((value) => {
      let alert = alertCtrl.create({
        title: 'Item moved',
        subTitle: 'So much fun!',
        buttons: ['OK']
      });
      alert.present();
    });
  }
}

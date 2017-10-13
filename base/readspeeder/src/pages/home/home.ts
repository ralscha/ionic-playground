import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TextDataProvider} from "../../providers/text-data/text-data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  text: any;

  constructor(public navCtrl: NavController,
              public textService: TextDataProvider) {
  }

  ionViewDidLoad() {
    this.text = this.textService.getSpeedReadingText();
  }

}

import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {LocationSelectPage} from '../location-select/location-select';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
  }

  launchLocationPage() {

    let modal = this.modalCtrl.create(LocationSelectPage);

    modal.onDidDismiss((location) => {
      console.log(location);
    });

    modal.present();

  }

}

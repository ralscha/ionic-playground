import { DetailsPage } from './../details/details';
import { BirthdayService } from './../../providers/birthday-service';
import { Component, NgZone } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public birthdays = [];

  constructor(private birthdayService: BirthdayService,
    private nav: NavController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private zone: NgZone) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => this.birthdayService.initDB())
      .then(() => this.birthdayService.getAll())
      .then(data => this.birthdays = data)
      .catch(console.error.bind(console));
  }

  showDetail(birthday) {
    let detailModal = this.modalCtrl.create(DetailsPage, { birthday: birthday });
    detailModal.onDidDismiss((item) => {
      //
    });
    detailModal.present();
  }
}
import {Component, NgZone} from "@angular/core";
import {Modal, NavController, Platform} from 'ionic-angular';
import {BirthdayProvider} from '../../providers/birthday-provider/birthday-provider';
import {DetailsPage} from '../details/details';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public birthdays = [];

  constructor(private birthdayProvider: BirthdayProvider,
    private nav: NavController,
    private platform: Platform) {
  }

  ionViewLoaded() {
    this.platform.ready().then(() => this.birthdayProvider.initDB())
      .then(() => this.birthdayProvider.getAll())
      .then(data => this.birthdays = data)
      .catch(console.error.bind(console));
  }

  showDetail(birthday) {
    let modal = Modal.create(DetailsPage, { birthday: birthday });
    this.nav.present(modal);

    modal.onDismiss(() => {

    });
  }
}
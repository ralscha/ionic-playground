import { BirthdayService } from './../../providers/birthday-service';
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  public birthday = {Name:'', Date: null};
  public isNew = true;
  public action = 'Add';
  public isoDate = '';

  constructor(private viewCtrl: ViewController,
    private navParams: NavParams,
    private birthdayService: BirthdayService) {
  }

  ionViewDidLoad() {
    this.birthday = this.navParams.get('birthday');

    if (!this.birthday || this.birthday.Date === null) {
      this.birthday = {Name:'', Date: null};
    }
    else {
      this.isNew = false;
      this.action = 'Edit';
      this.isoDate = this.birthday.Date.toISOString().slice(0, 10);
    }
  }

  save() {
    this.birthday.Date = new Date(this.isoDate);

    if (this.isNew) {
      this.birthdayService.add(this.birthday)
        .catch(console.error.bind(console));
    } else {
      this.birthdayService.update(this.birthday)
        .catch(console.error.bind(console));
    }

    this.dismiss();
  }

  delete() {
    this.birthdayService.delete(this.birthday)
      .catch(console.error.bind(console));

    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.birthday);
  }
}
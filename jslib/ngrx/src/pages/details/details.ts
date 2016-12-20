import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {AppState} from "../../providers/app-state";
import {Store} from "@ngrx/store";
import {BirthdayActions} from "../../actions/birthday-actions";
import {Birthday} from "../../models/birthday";

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  public birthday:Birthday = {name:null,date:null,_id:null};
  public isNew = true;
  public action = 'Add';
  public isoDate = '';

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private store: Store<AppState>,
              private birthdayActions: BirthdayActions) {
  }

  ionViewDidLoad() {
    this.birthday = this.navParams.get('birthday');

    if (!this.birthday) {
      this.birthday = {name:null,date:null,_id:null};
    }
    else {
      this.isNew = false;
      this.action = 'Edit';
      this.isoDate = this.birthday.date.toISOString().slice(0, 10);
    }
  }

  save() {
    this.birthday.date = new Date(this.isoDate);

    if (this.isNew) {
      this.store.dispatch(this.birthdayActions.addBirthday(this.birthday));
    }
    else {
      this.store.dispatch(this.birthdayActions.updateBirthday(this.birthday));
    }

    this.dismiss();
  }

  delete() {
    this.store.dispatch(this.birthdayActions.deleteBirthday(this.birthday));
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.birthday);
  }

}

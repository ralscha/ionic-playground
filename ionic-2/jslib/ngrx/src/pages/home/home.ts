import {Component, ChangeDetectionStrategy} from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {Birthday} from "../../models/birthday";
import {AppState} from "../../providers/app-state";
import {DetailsPage} from "../details/details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

  public birthdays: Observable<Birthday[]>;

  constructor(private nav: NavController,
              private modalCtrl: ModalController,
              private store: Store<AppState>) {
    this.birthdays = this.store.select(state => state.birthdays);
  }

  showDetail(birthday) {
    const modal = this.modalCtrl.create(DetailsPage, {birthday: birthday});
    modal.present();
  }

}

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {FirebaseListObservable, AngularFire} from "angularfire2";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  people: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public af: AngularFire) {
    this.people = af.database.list('/random');
  }

  pickEyeColor(eyeColor: string){
    this.people = this.af.database.list('random', {
      query: {
        orderByChild: 'eyeColor',
        equalTo: eyeColor
      }
    });
  }

  pickOlderPeople(age){
    this.people = this.af.database.list('random', {
      query: {
        orderByChild: 'age',
        startAt: parseInt(age),
        endAt: parseInt(age)+9
      }
    });
  }

}

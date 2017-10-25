import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LocationTrackerProvider} from "../../providers/location-tracker/location-tracker";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public locationTracker: LocationTrackerProvider) {

  }

  start(){
    this.locationTracker.startTracking();
  }

  stop(){
    this.locationTracker.stopTracking();
  }
}

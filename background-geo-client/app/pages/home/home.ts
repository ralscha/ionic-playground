import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {LocationTracker} from '../../providers/location-tracker/location-tracker';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  private tracking: boolean;

  constructor(private locationTracker: LocationTracker) {
    this.tracking = false;
  }

  start() {
    this.tracking = true;
    this.locationTracker.startTracking();
  }

  stop() {
    this.locationTracker.stopTracking();
    this.tracking = false;
  }
}

import {Component} from '@angular/core';
import {LocationTracker} from "../../providers/location-tracker";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public readonly locationTracker: LocationTracker) {
  }

  start() {
    this.locationTracker.startTracking();
  }

  stop() {
    this.locationTracker.stopTracking();
  }

  clear() {
    this.locationTracker.positions = [];
  }

}

import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {LocationTracker} from '../../providers/location-tracker/location-tracker';
import {ServerPush} from '../../providers/server-push/server-push';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  private tracking: boolean;

  constructor(private locationTracker: LocationTracker, private serverPush: ServerPush) {
    this.tracking = false;
  }

  start(): void {
    this.tracking = true;
    this.locationTracker.startTracking();
  }

  stop(): void {
    this.locationTracker.stopTracking();
    this.tracking = false;
  }

  clear(): void {
    this.serverPush.clear();
  }
}

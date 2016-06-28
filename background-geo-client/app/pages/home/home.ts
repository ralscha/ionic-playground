import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {LocationTracker} from '../../providers/location-tracker/location-tracker';
import {ServerPush} from '../../providers/server-push/server-push';
import {Subscription} from 'rxjs/Subscription';
import {Position} from '../../position';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  private subscription: Subscription;
  private stationarySub: Subscription;
  private tracking: boolean;

  constructor(private locationTracker: LocationTracker, private serverPush: ServerPush) {
    this.tracking = false;
  }

  start() {
    this.tracking = true;
    this.subscription = this.locationTracker.startTracking().subscribe(
      position => this.serverPush.pushPosition(position),
      error => this.serverPush.pushError(error));

    this.stationarySub = this.locationTracker.startStationaryTracking().subscribe(
      loc => this.serverPush.pushStationary(loc),
      error => this.serverPush.pushError(error));
  }

  stop() {
    this.subscription.unsubscribe();
    this.stationarySub.unsubscribe();
    this.tracking = false;
  }
}

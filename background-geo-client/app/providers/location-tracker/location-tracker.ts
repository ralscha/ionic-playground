import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Geolocation} from 'ionic-native';
import {Position} from '../../position';
import {Stationary} from '../../stationary';
import {ServerPush} from '../server-push/server-push';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';

declare var backgroundGeoLocation;

@Injectable()
export class LocationTracker {

  constructor(private serverPush: ServerPush) {
    this.configureStationaryTracking();
    this.configureTracking();
  }

  startTracking(): void {
    this.getForegroundLocation();
    backgroundGeoLocation.start();
  }

  stopTracking(): void {
    backgroundGeoLocation.stop();
  }

  getForegroundLocation(): void {
    Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000
    }).then(loc => {
      this.serverPush.pushPosition({
        accuracy: loc.coords.accuracy,
        bearing: loc.coords.heading,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        speed: loc.coords.speed,
        time: loc.timestamp
      });
    });
  }

  configureStationaryTracking(): void {
    backgroundGeoLocation.onStationary(location => {
      this.serverPush.pushStationary(location);
      backgroundGeoLocation.finish();
    });
  }

  configureTracking(): void {
    const backgroundOptions = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      stopOnTerminate: false,
      debug: false,
      notificationTitle: 'background-geo',
      notificationText: 'Demonstrate background geolocation',
      activityType: 'AutomotiveNavigation',
      locationProvider: backgroundGeoLocation.provider.ANDROID_DISTANCE_FILTER_PROVIDER
    };

    backgroundGeoLocation.configure(loc => {
      this.serverPush.pushPosition(
        {
          accuracy: loc.accuracy,
          bearing: loc.bearing,
          latitude: loc.latitude,
          longitude: loc.longitude,
          speed: loc.speed,
          time: loc.time
        }
      );
      backgroundGeoLocation.finish();
    }, (err) => {
      this.serverPush.pushError(err);
      backgroundGeoLocation.finish();
    }, backgroundOptions);

  }

}
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Geolocation, BackgroundGeolocation } from 'ionic-native';
import { Position } from '../position';
import { ServerPush } from './server-push';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';

@Injectable()
export class LocationTracker {

  constructor(private serverPush: ServerPush, platform: Platform) {
     platform.ready().then(() => {
        this.configureStationaryTracking();
        this.configureTracking();
     });
  }

  startTracking(): void {
    this.getForegroundLocation();
  }

  stopTracking(): void {
    BackgroundGeolocation.stop();
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
    BackgroundGeolocation.onStationary().then(location => {
      this.serverPush.pushStationary(location);
      BackgroundGeolocation.finish();
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
      locationProvider: BackgroundGeolocation.LocationProvider.ANDROID_ACTIVITY_PROVIDER,
      interval: 90000,
      fastestInterval: 60000,
      activitiesInterval: 80000
    };

    BackgroundGeolocation.configure(loc => {
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
      BackgroundGeolocation.finish();
    }, (err) => {
      this.serverPush.pushError(err);
      BackgroundGeolocation.finish();
    }, backgroundOptions);
    
    BackgroundGeolocation.start();

  }

}
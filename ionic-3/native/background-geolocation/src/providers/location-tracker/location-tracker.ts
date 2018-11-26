import {Injectable, NgZone} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import {Geolocation, Geoposition} from "@ionic-native/geolocation";
import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTrackerProvider {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  constructor(private readonly zone: NgZone,
              private readonly backgroundGeolocation: BackgroundGeolocation,
              private readonly geolocation: Geolocation) {
  }

  startTracking() {
    // Background Tracking
    const config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
    }, (err) => {
      console.log(err);
    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();


    // Foreground Tracking
    const options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options)
      .filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
        console.log(position);
        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        });
      });
  }

  stopTracking() {
    console.log('stopTracking');
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
}

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/filter';
import {BackgroundGeolocation, Geoposition, Geolocation} from "ionic-native";

@Injectable()
export class LocationTracker {

  public watch: any;
  public positions = [];

  startTracking() {
    this.stopTracking();

    // Background Tracking
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    BackgroundGeolocation.configure((location) => {
      this.positions.push({'lat': location.latitude, 'lng': location.longitude, 'ts': new Date(), 'bg': true});
    }, (err) => {
      this.positions.push({'error': err});
    }, config);

    // Turn ON the background-geolocation system.
    BackgroundGeolocation.start();


    // Foreground Tracking
    let options = {
      frequency: 60000,
      enableHighAccuracy: true
    };

    this.watch = Geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      this.positions.push({
        'lat': position.coords.latitude,
        'lng': position.coords.longitude,
        'ts': new Date(),
        'bg': false
      });
    });

  }

  stopTracking() {
    BackgroundGeolocation.finish();
    if (this.watch) {
      this.watch.unsubscribe();
      this.watch = null;
    }
  }

}

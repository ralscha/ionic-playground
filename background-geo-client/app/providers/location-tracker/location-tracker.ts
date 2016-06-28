import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Geolocation} from 'ionic-native';
import {Position} from '../../position';
import {Stationary} from '../../stationary';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';

declare var backgroundGeoLocation;

@Injectable()
export class LocationTracker {

  startStationaryTracking(): Observable<Stationary> {
    return Observable.create(observer => {
      backgroundGeoLocation.onStationary(location => {
        backgroundGeoLocation.finish();
        observer.next(location);
      });
    });
  }

  startTracking(): Observable<Position> {
    const backgroundOptions = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      stopOnTerminate: false,
      debug: false,
      notificationTitle: 'background-geo',
      notificationText: 'Demonstrate background geolocation',
      activityType: 'AutomotiveNavigation',
      locationProvider: backgroundGeoLocation.provider.ANDROID_DISTANCE_FILTER_PROVIDER,
      interval: 60000, 
      fastestInterval: 120000,      
      url: 'http://192.168.178.84:8888/tracking'
    };

    const geolocObservable:Observable<Position> = Observable.from(Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000
    })).map(loc => {
      return {
        accuracy: loc.coords.accuracy,
        bearing: loc.coords.heading,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        speed: loc.coords.speed,
        time: loc.timestamp
      }
    });

    const backgroundObservable:Observable<Position> = Observable.create(observer => {
      backgroundGeoLocation.configure(loc => {
        observer.next(
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
        observer.error(err);
      }, backgroundOptions);

      backgroundGeoLocation.start();

      return () => {
        backgroundGeoLocation.stop();
      };
    });

    return geolocObservable.concat(backgroundObservable);

  }

}
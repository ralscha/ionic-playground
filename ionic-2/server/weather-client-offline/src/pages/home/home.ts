import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Geolocation} from 'ionic-native';
import {Storage} from '@ionic/storage';
import {SQLite} from 'ionic-native';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import {SafeHttp} from "../../providers/safe-http";
import {Platform} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public data: any;
  public errorMessage: any;
  public storage: SQLite;
  private mapsApiUrl: string = "http://192.168.178.84:8080/reverseGeocode";
  private weatherApiUrl: string = "http://192.168.178.84:8080/forecast";

  constructor(private http: SafeHttp, private platform: Platform, private ionicStorage: Storage) {
    this.platform.ready().then(() => {
      this.data = {};
      // [Step 2 - Creating Tables]
      this.storage = new SQLite();
      this.storage.openDatabase({
        name: 'ionic.offline',
        location: 'default'
      }).then(() => {
        this.storage.executeSql(`create table if not exists forecasts(
        date CHAR(5) PRIMARY KEY,
        location CHAR(40),
        icon CHAR(30),
        tempCurrent INT,
        tempMin INT,
        tempMax INT)`, []);
      });

      // [Step 5 - Tying it Together]
      this.getForecast(this.getToday()).then((data) => {
        if (data) {
          // obtained forecast from database
          this.data = data;
        } else {
          // could not get forecast from database, go to network
          this.fetchForecasts();
        }
      });
    });
  }

  handleError(error: any) {
    console.log('error', error);
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  // NETWORK

  fetchForecasts() {
    this.fetchCoordinates()
      .then((coords) => {
        this.data.coords = coords;
        if (coords) {
          return this.fetchCityStateName(coords.latitude, coords.longitude);
        }
        return null;
      })
      .then((locationName) => {
        this.data.location = locationName;
        this.fetchWeatherData(this.data.coords.latitude, this.data.coords.longitude)
          .subscribe(
            data => this.data = data[0],
            error => this.errorMessage = error);
      });
  }

  fetchWeatherData(lat, long) {
    let url = `${this.weatherApiUrl}?lat=${lat}&lng=${long}`;
    return this.http.get(url)
      .filter(res => res !== null)
      .map(res => res.json())
      .map(this.formatWeatherData)
      .map(this.saveForecasts)
      .catch(this.handleError);
  }

  fetchCoordinates() {
    return Geolocation.getCurrentPosition().then((data) => {
      this.ionicStorage.set('latitude', data.coords.latitude);
      this.ionicStorage.set('longitude', data.coords.longitude);
      return data.coords;
    }, (err) => {
      console.log('positionError', err);
    });
  }

  fetchCityStateName(lat, long) {
    let url = `${this.mapsApiUrl}?lat=${lat}&lng=${long}`;
    let city: string;
    let state: string;
    this.http.get(url)
      .filter(res => res !== null)
      .map(res => res.json())
      .subscribe(
        data => {
          city = data.city;
          state = data.state;
          let location = `${city}, ${state}`;
          this.data.location = location;
          this.saveLocation(location);
        }
      );
  }

  // DATABASE

  saveLocation(location: string) {
    this.ionicStorage.set('location', location);
  }

  getLocation() {
    return this.ionicStorage.get('location').then((location) => {
      return location;
    });
  }

  // [Step 4 - Retrieving Data]
  getForecast(date: string): Promise<any> {
    return this.storage.openDatabase({
      name: 'ionic.offline',
      location: 'default'
    }).then(() => this.storage.executeSql("SELECT * FROM forecasts WHERE date = ?", [date]))
      .then((resp) => {
        if (resp.rows.length > 0) {
          for (var i = 0; i < resp.rows.length; i++) {
            return resp.rows.item(i);
          }
        }
        return null;
      });
  }


  // [Step 3 - Saving Data]
  saveForecasts = (forecasts) => {
    let query = "INSERT OR REPLACE INTO forecasts VALUES (?, ?, ?, ?, ?, ?)";
    for (let forecast of forecasts) {
      this.storage.executeSql(query, [
        forecast.date,
        forecast.location,
        forecast.icon,
        forecast.tempCurrent,
        forecast.tempMin,
        forecast.tempMax
      ]).catch(e=>console.log(e));
    }
    return forecasts;
  }


  // UTILITY

  formatWeatherData = (body) => {
    // format today's weather data
    let icon = this.getIoniconName(body.currently.icon);
    let date = this.dateFromTimestamp(body.currently.time);
    let formattedData = [
      {
        'date': date,
        'location': this.data.location,
        'icon': icon,
        'tempCurrent': Math.round(body.currently.temperature),
        'tempMin': Math.round(body.daily.data[0].temperatureMin),
        'tempMax': Math.round(body.daily.data[0].temperatureMax)
      }
    ];

    // format this week's weather data
    for (let item of body.daily.data.slice(1)) {
      let icon = this.getIoniconName(item.icon);
      let date = this.dateFromTimestamp(item.time);
      formattedData.push({
        'date': date,
        'location': this.data.location,
        'icon': icon,
        'tempCurrent': Math.round((item.temperatureMin + item.temperatureMax) / 2),
        'tempMin': Math.round(item.temperatureMin),
        'tempMax': Math.round(item.temperatureMax)
      });
    }
    return formattedData || [];
  }

  getIoniconName(forecastIconName) {
    return {
      'CLEAR_DAY': 'sunny',
      'CLEAR_NIGHT': 'moon',
      'RAIN': 'rainy',
      'SNOW': 'snow',
      'SLEET': 'snow',
      'WIND': 'cloudy',
      'FOG': 'cloud',
      'CLOUDY': 'cloud',
      'PARTLY_CLOUDY_DAY': 'partly-sunny',
      'PARTLY_CLOUDY_NIGHT': 'cloudy-night'
    }[forecastIconName];
  }

  // DATES

  getToday() {
    let timestamp = (Date.now() / 1000);
    return this.dateFromTimestamp(timestamp);
  }

  dateFromTimestamp(timestamp: number) {
    let date = new Date(timestamp * 1000);
    return date.getMonth().toString() + '/' + date.getDate().toString();
  }

}

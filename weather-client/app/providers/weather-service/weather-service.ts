import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  private endpoint: string = 'http://192.168.178.20:8888/forecast';

  constructor(private http: Http) {
  }

  load(latitude: string, longitude: string): any {
    return this.http.get(this.endpoint + '?lat=' + latitude + '&lng=' + longitude)
      .map(res => res.json());
  }
}


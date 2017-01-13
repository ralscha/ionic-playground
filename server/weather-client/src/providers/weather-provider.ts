import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {

  private endpoint: string = 'http://localhost:8080/forecast';

  constructor(private http: Http) {
  }

  load(latitude: string, longitude: string): any {
    return this.http.get(this.endpoint + '?lat=' + latitude + '&lng=' + longitude)
      .map(res => res.json());
  }
}


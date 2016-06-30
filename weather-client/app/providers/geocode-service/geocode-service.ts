import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GeocodeService {

  private endpoint: string = 'http://192.168.178.20:8888/geocode';

  constructor(private http: Http) {
  }

  geocode(address): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.endpoint + '?address=' + encodeURIComponent(address))
        .map(res => res.json())
        .subscribe(data => {
          if (data.successful) {
            resolve(data);
          } else {
            reject(data);
          }
        });
    });
  }
}


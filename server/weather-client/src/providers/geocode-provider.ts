import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GeocodeProvider {

  private endpoint: string = 'http://localhost:8080/geocode';

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


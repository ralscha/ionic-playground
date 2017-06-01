import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Twitch {
  private readonly clientId = '&client_id=.....';

  constructor(public http: Http) {
  }

  streams(pagination:number) {
    return this.http.get(`https://api.twitch.tv/kraken/streams?offset=${pagination}${this.clientId}`)
      .map(data => data.json());
  }

}

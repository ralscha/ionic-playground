import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Position} from '../../position';
import {Stationary} from '../../stationary';

@Injectable()
export class ServerPush {
  private serverURL: string = 'http://192.168.178.84:8888';
  private jsonOptions: RequestOptions;
  private textOptions: RequestOptions;

  constructor(private http: Http) {
    this.jsonOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    this.textOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'text/plain' }) });
  }

  pushStationary(stat: Stationary) {
    this.http.post(this.serverURL + '/stationary', JSON.stringify(stat), this.jsonOptions)
      .subscribe(() => { }, error => console.log(error));
  }

  pushPosition(pos: Position) {
    this.http.post(this.serverURL + '/pos', JSON.stringify(pos), this.jsonOptions)
      .subscribe(() => { }, error => console.log(error));
  }

  pushError(error: string) {
    this.http.post(this.serverURL + '/clienterror', error, this.textOptions)
      .subscribe(() => { }, error => console.log(error));
  }
}

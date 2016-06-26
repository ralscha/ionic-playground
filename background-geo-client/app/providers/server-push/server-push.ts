import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Position} from '../../position';

@Injectable()
export class ServerPush {
  private jsonOptions: RequestOptions;
  private textOptions: RequestOptions;

  constructor(private http: Http) {
    this.jsonOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    this.textOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'text/plain' }) });
  }

  pushPosition(pos: Position) {
    this.http.post("http://192.168.178.20:8888/pos", JSON.stringify(pos), this.jsonOptions)
             .subscribe(() => console.log('done'), error => console.log(error));
  }

  pushError(error: string) {
    this.http.post("http://192.168.178.20:8888/error", error, this.textOptions);
  }
}

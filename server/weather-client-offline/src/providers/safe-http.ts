import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import {NetworkService} from "./network-service";
import {Observable} from "rxjs";

@Injectable()
export class SafeHttp {

  constructor(private http: Http, private networkService: NetworkService) {
  }

  get(url: string, options?: RequestOptionsArgs):Observable<Response|null> {
    if (this.networkService.noConnection()) {
      this.networkService.showNetworkAlert();
      return Observable.of(null);
    } else {
      return this.http.get(url, options)
    }
  }


  post(url: string, body: string, options?: RequestOptionsArgs):Observable<Response|null> {
    if (this.networkService.noConnection()) {
      this.networkService.showNetworkAlert();
      return Observable.of(null);
    } else {
      return this.http.post(url, body, options)
    }
  }

}

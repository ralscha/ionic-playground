import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageSearch {

  private appid = "fgQ7ve/sV/eB3NN/+fDK9ohhRWj1z1us4eIbidcsTBM";
  private rooturl = "https://api.datamarket.azure.com/Bing/Search/v1/Image?$format=json&Query='";

  constructor(private readonly http: Http) {
  }

  search(term:string) {
      const url = this.rooturl + encodeURIComponent(term) + "'&$top=10";
      const headers = new Headers();
      headers.append('Authorization', 'Basic '+ btoa(this.appid + ':' + this.appid));
      return this.http.get(url,{headers:headers})
        .map(res => res.json())
        .map(data => data.d.results);   
  }

}
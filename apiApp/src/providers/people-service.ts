import { Person } from './person';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs'

@Injectable()
export class PeopleService {
  data: Person[];
  observable: Observable<Person[]>;

  constructor(private http: Http) {
  }

  load(): Observable<Person[]> {
    if(this.data) {
      return Observable.of(this.data);
    } 
    else if(this.observable) {
      return this.observable;
    } else {      
      this.observable = this.http.get('https://randomuser.me/api/?results=10')
          .map(res => res.json())
          .map(res => res.results)
          .do(val => {
            this.data = val;
            this.observable = null;
          })
          .share();
      return this.observable;
    }
  }

}

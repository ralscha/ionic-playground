import { Person } from './../../providers/person';
import { PeopleService } from './../../providers/people-service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public people: Observable<Person[]>;

  constructor(private peopleService: PeopleService) {
    this.people = this.peopleService.load();
  }

}

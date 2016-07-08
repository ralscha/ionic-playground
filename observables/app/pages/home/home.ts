import {Component} from '@angular/core';
import {Control} from '@angular/common';
import {NavController} from 'ionic-angular';
import {WikipediaService} from '../../providers/wikipedia-service/wikipedia-service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
 items: Observable<Array<string>>;
  term = new Control();

 constructor(private wikipediaService: WikipediaService) {
    this.items = this.term.valueChanges
                 .debounceTime(400)
                 .distinctUntilChanged()
                 .switchMap(term => this.wikipediaService.search(term));
  }
}

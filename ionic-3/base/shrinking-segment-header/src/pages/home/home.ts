import {Component} from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  section: string = 'two';
  somethings: any = new Array(20);

}

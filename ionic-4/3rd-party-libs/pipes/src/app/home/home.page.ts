import {Component} from '@angular/core';
import {MaxPipe} from 'ngx-pipes';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  arr = ['First item', 'Second item', 'Third item'];

  myObj = {
    name: 'Simon',
    age: 29
  };

  numbers = [2, 15, 6, 42, 99];

  constructor(private maxPipe: MaxPipe) {

  }

  callPipe() {
    alert(this.maxPipe.transform(this.numbers));
  }
}

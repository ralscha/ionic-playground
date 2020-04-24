import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = ['one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine', 'ten'];
}

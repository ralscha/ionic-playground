import {Component} from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any = new Array(10);

  handleOverslide(item) {
    console.log(item);
  }

}

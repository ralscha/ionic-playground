import {Component} from '@angular/core';
import 'rxjs/add/operator/map'
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  information: any[];

  constructor(http: HttpClient) {
    http.get<any>('assets/information.json')
      .subscribe(data => {
        this.information = data.items;
      })
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }

  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

}

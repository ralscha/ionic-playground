import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  items: { title: string, body: string, avatarUrl: string }[] = [];

  constructor(private navController: NavController) {

    for (let i = 0; i < 2000; i++) {

      let item = {
        title: 'Title',
        body: 'body',
        avatarUrl: 'https://avatars.io/facebook/random' + i
      };

      this.items.push(item);
    }
  }
}

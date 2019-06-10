import {Component} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  selectedPath = '';

  pages = [
    {
      title: 'First Page with Tabs',
      url: '/menu/first',
      icon: 'bicycle'
    },
    {
      title: 'Second Page blank',
      url: '/menu/second',
      icon: 'airplane'
    }
  ];

  constructor(private readonly router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

}

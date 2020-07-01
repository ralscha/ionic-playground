import {Component} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  pages = [
    {
      title: 'Main',
      url: '/menu/main',
      icon: 'home',
      open: true
    },
    {
      title: 'Cool Frameworks',
      children: [
        {
          title: 'Ionic',
          url: '/menu/ionic',
          icon: 'logo-ionic',
          open: false
        },
        {
          title: 'Flutter',
          url: '/menu/flutter',
          icon: 'logo-google',
          open: false
        },
      ]
    }
  ];
}

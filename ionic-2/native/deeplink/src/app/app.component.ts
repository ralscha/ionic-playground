import { ProductPage } from './../pages/product/product';
import { AboutPage } from './../pages/about/about';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen, Deeplinks } from 'ionic-native';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  @ViewChild(Nav) navChild: Nav;

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      Deeplinks.routeWithNavController(this.navChild, {
        '/about-us': AboutPage,
        '/universal-links-test': AboutPage,
        '/products/:productId': ProductPage
      }).subscribe((match) => {
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.warn('Unmatched Route', nomatch);
      });
    })
  }


}

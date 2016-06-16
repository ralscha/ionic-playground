import {ViewChild,AfterViewInit,Component} from '@angular/core';
import {Platform, ionicBootstrap, Nav, NavController} from 'ionic-angular';
import {StatusBar, Deeplinks} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {AboutPage} from './pages/about/about';
import {ProductPage} from './pages/product/product';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp implements AfterViewInit {
  rootPage: any = HomePage;

  @ViewChild(Nav) navChild:Nav;

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {

      // Convenience to route with a given nav
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

ionicBootstrap(MyApp);

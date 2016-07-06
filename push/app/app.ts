import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
declare var FCMPlugin;

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      FCMPlugin.getToken(token => {
        console.log(token);
      }, err => console.log('error retrieving token: ' + err));

      FCMPlugin.subscribeToTopic('topicExample');

      FCMPlugin.onNotification(
        function (data) {
          if (data.wasTapped) {
            //Notification was received on device tray and tapped by the user.
            console.log(data);
          } else {
            //Notification was received in foreground. Maybe the user needs to be notified.
            console.log(data);
          }
        },
        function (msg) {
          console.log('onNotification callback successfully registered: ' + msg);
        },
        function (err) {
          console.log('Error registering onNotification callback: ' + err);
        }
      );

    });
  }
}

ionicBootstrap(MyApp);

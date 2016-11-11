import { Platform } from 'ionic-angular';
import { Component, NgZone } from '@angular/core';
declare var FCMPlugin;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token: string;
  msg: string;

  constructor(platform: Platform, zone: NgZone) {
    var me = this;
    me.token = 'Start';
    platform.ready().then(() => {
      me.token = 'Ready';
      FCMPlugin.getToken(token => {
        zone.run(() => me.token = token);
      }, err => zone.run(() => me.msg = 'error retrieving token: ' + err));

      FCMPlugin.subscribeToTopic('topicExample');

      FCMPlugin.onNotification(
        function (data) {
          if (data.wasTapped) {
            //Notification was received on device tray and tapped by the user.
            zone.run(() => me.msg = "tapped: " + JSON.stringify(data));
          } else {
            //Notification was received in foreground. Maybe the user needs to be notified.
            zone.run(() => me.msg = "foreground: " + JSON.stringify(data));
          }
        },
        function (msg) {
          zone.run(() => me.msg = 'onNotification callback successfully registered');          
        },
        function (err) {
          zone.run(() => me.msg = 'onNotification callback successfully registered');
        }
      );
    });
  }

}

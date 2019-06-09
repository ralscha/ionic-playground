import {Component} from '@angular/core';
import {LocalNotificationPendingList, LocalNotificationRequest, Plugins} from '@capacitor/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  scheduled: LocalNotificationRequest[] = [];

  constructor(private alertCtrl: AlertController) {

    Plugins.LocalNotifications.addListener('localNotificationReceived', notification => {
      const msg = notification.extra ? notification.extra.mydata : '';
      this.showAlert(notification.title, notification.body, msg);
    });

    Plugins.LocalNotifications.addListener('localNotificationActionPerformed', actionperformed => {
      const notification = actionperformed.notification;
      console.log(actionperformed.actionId, actionperformed.inputValue);
      const msg = notification.extra ? notification.extra.mydata : '';
      this.showAlert(notification.title, notification.body, msg);
    });

  }

  scheduleNotification() {
    Plugins.LocalNotifications.schedule({
      notifications: [
        {
          title: 'Attention',
          body: 'Simons Notification',
          id: 1,
          schedule: { at: new Date(Date.now() + 5_000) },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: { mydata: 'My hidden message this is' }
        }
      ]
    });

  }

  recurringNotification() {
    Plugins.LocalNotifications.schedule({
      notifications: [
        {
          title: 'Recurring',
          body: 'Simons Recurring Notification',
          id: 22,
          schedule: { every: 'minute'},
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }

  repeatingDaily() {
    Plugins.LocalNotifications.schedule({
      notifications: [
        {
          title: 'Good Morning',
          body: 'Code something epic today!',
          id: 42,
          schedule: { every: 'day', on: { hour: 9, minute: 30 } },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }

  showAlert(header: string, sub: string, msg: string) {
    this.alertCtrl.create({
      header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

  getAll() {
    Plugins.LocalNotifications.getPending().then(list => this.scheduled = list.notifications);
  }

}

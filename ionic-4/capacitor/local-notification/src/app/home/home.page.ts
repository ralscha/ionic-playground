import {Component} from '@angular/core';
import {LocalNotifications, LocalNotificationPendingList, LocalNotificationRequest} from '@capacitor/local-notifications';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  scheduled: LocalNotificationRequest[] = [];

  constructor(private alertCtrl: AlertController) {

    LocalNotifications.addListener('localNotificationReceived', notification => {
      const msg = notification.extra ? notification.extra.mydata : '';
      this.showAlert(notification.title, notification.body, msg);
    });

    LocalNotifications.addListener('localNotificationActionPerformed', actionperformed => {
      const notification = actionperformed.notification;
      console.log(actionperformed.actionId, actionperformed.inputValue);
      const msg = notification.extra ? notification.extra.mydata : '';
      this.showAlert(notification.title, notification.body, msg);
    });

  }

  scheduleNotification(): void {
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Attention',
          body: 'Simons Notification',
          id: 1,
          schedule: { at: new Date(Date.now() + 5_000) },
          sound: undefined,
          attachments: undefined,
          actionTypeId: '',
          extra: { mydata: 'My hidden message this is' }
        }
      ]
    });

  }

  recurringNotification(): void {
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Recurring',
          body: 'Simons Recurring Notification',
          id: 22,
          schedule: { every: 'minute'},
          sound: undefined,
          attachments: undefined,
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }

  repeatingDaily(): void {
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Good Morning',
          body: 'Code something epic today!',
          id: 42,
          schedule: { every: 'day', on: { hour: 9, minute: 30 } },
          sound: undefined,
          attachments: undefined,
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }

  showAlert(header: string, sub: string, msg: string): void{
    this.alertCtrl.create({
      header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

  getAll(): void {
    LocalNotifications.getPending().then(list => this.scheduled = list.notifications);
  }

}

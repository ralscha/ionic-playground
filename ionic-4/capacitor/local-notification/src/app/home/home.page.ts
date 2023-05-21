import {Component} from '@angular/core';
import {
  LocalNotifications,
  LocalNotificationDescriptor
} from '@capacitor/local-notifications';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  scheduled: LocalNotificationDescriptor[] = [];

  constructor(private alertCtrl: AlertController) {
    this.hasPermission().then(() => {
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
    });

  }

  async scheduleNotification() {
    if (!await this.hasPermission()) {
      return;
    }
    await LocalNotifications.schedule({
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

  async recurringNotification() {
    if (!await this.hasPermission()) {
      return;
    }
    await LocalNotifications.schedule({
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

  async repeatingDaily() {
    if (!await this.hasPermission()) {
      return;
    }
    await LocalNotifications.schedule({
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

  async hasPermission(): Promise<boolean> {
    const permissions = await LocalNotifications.checkPermissions();
    if (permissions.display !== 'granted') {
      const newPermissions = await LocalNotifications.requestPermissions();
      if (newPermissions.display === 'denied') {
        return false;
      }
    }
    return true;
  }

}

import { Component } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SimpleModalPage} from '../simple-modal/simple-modal.page';
import {BehaviorSubject} from 'rxjs';
import {UpdateModalPage} from '../update-modal/update-modal.page';
import {ToastModalPage} from '../toast-modal/toast-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  choice = 'Credit Card';

  constructor(private readonly modalCtrl: ModalController) {}

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SimpleModalPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modal.present();
  }

  async presentStyleModal() {
    const modal = await this.modalCtrl.create({
      component: SimpleModalPage,
      breakpoints: [0, 0.4, 1],
      initialBreakpoint: 0.4,
      cssClass: 'style-modal'
    });
    await modal.present();
  }

  async presentUpdateModal() {
    const mySubject = new BehaviorSubject(this.choice);

    const modal = await this.modalCtrl.create({
      component: UpdateModalPage,
      breakpoints: [0, 0.2],
      initialBreakpoint: 0.2,
      handle: false,
      componentProps: {
        mySubject
      },
    });
    await modal.present();

    mySubject.subscribe((value: string) => {
      this.choice = value;
    });

    modal.onDidDismiss().then((() => {
      mySubject.unsubscribe();
    }));
  }

  async presentToastModal() {
    const modal = await this.modalCtrl.create({
      component: ToastModalPage,
      breakpoints: [0, 0.3],
      initialBreakpoint: 0.3,
      cssClass: 'custom-modal',
      handle: false
    });
    await modal.present();

    // Optional: Hide the modal after a duration!
    setTimeout(() => modal.dismiss(), 2000);
  }

}

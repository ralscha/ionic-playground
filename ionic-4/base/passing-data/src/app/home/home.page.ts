import {Component} from '@angular/core';
import {ModalController, NavController, PopoverController} from '@ionic/angular';
import {ModalPage} from '../pages/modal/modal.page';
import {PopoverPage} from '../pages/popover/popover.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  myid: string;

  constructor(private readonly navCtrl: NavController,
              private readonly modalCtrl: ModalController,
              private readonly popoverCtrl: PopoverController) {
  }

  pushPage() {
    this.navCtrl.navigateForward(`/second/${this.myid}`);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {myid: this.myid}
    });

    await modal.present();
  }


  async openPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      componentProps: {myid: this.myid},
      event
    });

    await popover.present();
  }

}

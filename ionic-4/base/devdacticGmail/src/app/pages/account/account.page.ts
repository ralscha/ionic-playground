import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {

  constructor(private popoverCtrl: PopoverController) { }

  close() {
    this.popoverCtrl.dismiss();
  }
}

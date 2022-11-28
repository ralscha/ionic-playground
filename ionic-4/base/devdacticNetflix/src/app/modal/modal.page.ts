import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import categoryData from '../../assets/mockdata/categories.json';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {
  categories = categoryData;

  constructor(private modalCtrl: ModalController) { }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}

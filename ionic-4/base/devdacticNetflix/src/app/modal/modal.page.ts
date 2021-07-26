import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import categoryData from '../../assets/mockdata/categories.json';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  categories = categoryData;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}

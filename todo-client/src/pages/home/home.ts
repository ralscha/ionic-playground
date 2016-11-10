import { Data } from './../../providers/data';
import { ItemDetailPage } from './../item-detail/item-detail';
import { AddItemPage } from './../add-item/add-item';
import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data) {
    this.dataService.getData().then((todos) => {
      if (todos) {
        this.items = JSON.parse(todos);
      }
    });
  }

  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);
    addModal.onDidDismiss((item) => {
      if (item) {
        this.saveItem(item);
      }
    });
    addModal.present();
  }

  deleteItem(item) {
    this.items.splice(this.items.indexOf(item), 1);
    this.dataService.save(this.items);
  }

  saveItem(item) {
    this.items.push(item);
    this.dataService.save(this.items);
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}
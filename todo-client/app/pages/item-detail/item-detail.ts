import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/item-detail/item-detail.html',
})
export class ItemDetailPage {

  private title: string;
  private description: string;

  constructor(private navParams: NavParams) {
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;
  }

}

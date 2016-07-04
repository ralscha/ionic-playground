import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/add-item/add-item.html',
})
export class AddItemPage {

  private title: string = "";
  private description: string = "";

  constructor(private nav: NavController, private view: ViewController) {
  }

  saveItem() {
    let newItem = {
      title: this.title,
      description: this.description
    };

    this.view.dismiss(newItem);
  }

  close() {
    this.view.dismiss();
  }

}

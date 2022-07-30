import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.page.html',
  styleUrls: ['./sheet.page.scss'],
})
export class SheetPage {
  items = [
    {
      text: 'Create a Short',
      icon: 'videocam-outline',
    },
    {
      text: 'Upload a video',
      icon: 'push-outline',
    },
    {
      text: 'Go live',
      icon: 'radio-outline',
    },
    {
      text: 'Add to your story',
      icon: 'add-circle-outline',
    },
    {
      text: 'Create a post',
      icon: 'create-outline',
    },
  ];

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}

import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  passedId = null;

  constructor(private readonly navParams: NavParams,
              private readonly modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.passedId = this.navParams.get('myid');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}

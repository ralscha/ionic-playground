import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-broker-detail',
  templateUrl: 'broker-detail.html'
})
export class BrokerDetailPage {

  broker: any;

  constructor(private navParams: NavParams) {
    this.broker = navParams.data;
  }

}

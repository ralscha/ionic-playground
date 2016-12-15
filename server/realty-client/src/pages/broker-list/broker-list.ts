import { BrokerDetailPage } from './../broker-detail/broker-detail';
import { BrokerService } from './../../providers/broker-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-broker-list',
  templateUrl: 'broker-list.html'
})
export class BrokerListPage {

  brokers: Array<any>;

  constructor(public navCtrl: NavController, public service: BrokerService) {
    service.findAll().subscribe(data => this.brokers = data);
  }

  openBrokerDetail(broker) {
    this.navCtrl.push(BrokerDetailPage, broker);
  }

}

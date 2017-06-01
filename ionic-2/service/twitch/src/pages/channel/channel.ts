import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html'
})
export class ChannelPage {
  data:any;

  constructor(private params: NavParams) {
    this.data = params.get("dataChannel");
  }

}

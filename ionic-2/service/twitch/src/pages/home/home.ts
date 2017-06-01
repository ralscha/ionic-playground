import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Twitch} from "../../providers/twitch";
import {ChannelPage} from "../channel/channel";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  datas: any = [];
  pagination: number = 0;

  constructor(private readonly navCtrl: NavController, private readonly twitch: Twitch) {
    twitch.streams(this.pagination).subscribe(data => {
      this.datas = data.streams;
    });
  }

  openChannel(dataChannel) {
    this.navCtrl.push(ChannelPage, {
      dataChannel: dataChannel
    });
  }

  infiniteScroll(ev) {
    this.pagination += 25;
    this.twitch.streams(this.pagination).subscribe(data => {
      this.datas.push(...data.streams);
      ev.complete();
    });
  }

  doRefresh(ev) {
    this.pagination = 0;
    this.twitch.streams(this.pagination).subscribe(data => {
      ev.complete();
      this.datas = data.streams;
    })
  }

}

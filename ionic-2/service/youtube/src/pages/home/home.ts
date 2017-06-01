import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Youtube} from "../../providers/youtube";
import {PlaylistPage} from "../playlist/playlist";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  channel = 'UCHEf6T_gVq4tlW5i91ESiWg';
  datas: any;
  nextPageToken: string;

  constructor(public navCtrl: NavController, private readonly yt: Youtube) {
    yt.playlist(this.channel).map(data => data.json()).subscribe(json => {
      this.datas = json.items;
      if (json.nextPageToken) {
        this.nextPageToken = json.nextPageToken;
      }
    });
  }

  openPlaylist(id) {
    this.navCtrl.push(PlaylistPage, {id: id});
  }

  infiniteScroll(ev) {
    if (this.nextPageToken) {
      this.yt.playlist_page(this.channel, this.nextPageToken).map(data => data.json()).subscribe(json => {
        for (let i of json.items) {
          this.datas.push(i);
        }
        ev.complete();
        if (!json.nextPageToken) {
          this.nextPageToken = null;
        } else {
          this.nextPageToken = json.nextPageToken;
        }
      })
    } else {
      ev.complete();
    }
  }
}

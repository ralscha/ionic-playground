import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Youtube} from "../../providers/youtube";

@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html'
})
export class PlaylistPage {
  datas: any;
  nextPageToken: any;

  constructor(private navCtrl: NavController,
              private params: NavParams,
              private yt: Youtube) {
    yt.playlistList(params.data.id)
      .map(data => data.json())
      .subscribe(json => {
        this.datas = json.items;
        if (json.nextPageToken) {
          this.nextPageToken = json.nextPageToken;
        }
      })
  }

  infiniteScrool(ev) {
    if (this.nextPageToken) {
      this.yt.playlistList_page(this.params.data.id, this.nextPageToken)
        .map(data => data.json())
        .subscribe(json => {
          for (let i of json.items) {
            this.datas.push(i);
          }
          if (!json.nextPageToken) {
            this.nextPageToken = null;
          } else {
            this.nextPageToken = json.nextPageToken;
          }
          ev.complete();
        });
    } else {
      ev.complete();
    }
  }

}

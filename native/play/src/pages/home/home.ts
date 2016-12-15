import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Device} from "ionic-native";

declare var Media: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isAndroid: boolean;
  media: any;

  constructor(private platform: Platform) {
  }

  ionViewDidEnter() {
    this.init();
  }

  ionViewDidLeave() {
    this.media.stop();
    this.media = null;
  }

  init() {
    this.platform.ready().then(() => {
        if (Device.device.platform.toLowerCase() === "android") {
          this.isAndroid = true;
        }

        this.media = new Media('https://static.rasc.ch/missed.mp3', null, this.mediaError, this.mediaStatus);
        this.media.play({numberOfLoops: 99});
      }
    )
  }


  mediaError(e) {
    console.log('mediaError', e);
  }

  mediaStatus(status) {
    if (this.isAndroid && status === Media.MEDIA_STOPPED) {
      this.media.seekTo(0);
      this.media.play();
    }
  }

}

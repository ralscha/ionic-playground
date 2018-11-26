import {Component} from '@angular/core';
import {SplashScreen} from "@ionic-native/splash-screen";
import {ViewController} from "ionic-angular";

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public viewCtrl: ViewController, public splashScreen: SplashScreen) {
  }

  ionViewDidEnter() {
    this.splashScreen.hide();
    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 4000);
  }
}

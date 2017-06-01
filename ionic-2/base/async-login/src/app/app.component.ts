import {Component} from '@angular/core';
import {HomePage} from '../pages/home/home';
import {Auth} from "../providers/auth";
import {LoginPage} from "../pages/login/login";
import {LoadingController, Loading} from "ionic-angular";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  loader: Loading

  constructor(private readonly auth: Auth, private readonly loadingCtrl: LoadingController) {
    this.presentLoading();

    this.auth.login().then(isLoggedIn => {
      if (isLoggedIn) {
        this.rootPage = HomePage;
      }
      else {
        this.rootPage = LoginPage;
      }
      this.loader.dismiss();
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    })
    this.loader.present();
  }
}

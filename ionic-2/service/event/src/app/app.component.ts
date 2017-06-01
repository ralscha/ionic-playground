import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import firebase from 'firebase';
import {LoginPage} from "../pages/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform) {

    const config = {
      apiKey: "AIzaSyAPbet2dEHUoCjKpW6BS0dlR5VQWjrsDig",
      authDomain: "event-2e9ba.firebaseapp.com",
      databaseURL: "https://event-2e9ba.firebaseio.com",
      storageBucket: "event-2e9ba.appspot.com",
      messagingSenderId: "552056163125"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = LoginPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}

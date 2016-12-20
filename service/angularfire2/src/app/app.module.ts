import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {AngularFireModule, AuthMethods, AuthProviders} from "angularfire2";

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyAPbet2dEHUoCjKpW6BS0dlR5VQWjrsDig",
  authDomain: "event-2e9ba.firebaseapp.com",
  databaseURL: "https://event-2e9ba.firebaseio.com",
  storageBucket: "event-2e9ba.appspot.com",
  messagingSenderId: "552056163125"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}

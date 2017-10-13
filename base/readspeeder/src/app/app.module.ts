import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TextDataProvider} from '../providers/text-data/text-data';
import {SpeedReaderComponent} from "../components/speed-reader/speed-reader";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SpeedReaderComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TextDataProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TextDataProvider
  ]
})
export class AppModule {
}

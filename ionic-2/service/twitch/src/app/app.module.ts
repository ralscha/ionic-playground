import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ChannelPage} from "../pages/channel/channel";
import {Twitch} from "../providers/twitch";
import {Safe} from "../pipes/safe";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChannelPage,
    Safe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChannelPage
  ],
  providers: [Twitch, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

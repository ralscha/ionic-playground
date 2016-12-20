import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {SafeHttp} from "../providers/safe-http";
import {NetworkService} from "../providers/network-service";
import {Storage} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [Storage, SafeHttp, NetworkService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}

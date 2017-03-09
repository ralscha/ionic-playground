import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {SafeHttp} from "../providers/safe-http";
import {NetworkService} from "../providers/network-service";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [SafeHttp, NetworkService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}

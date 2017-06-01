import { ServerPush } from './../providers/server-push';
import { LocationTracker } from './../providers/location-tracker';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

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
  providers: [LocationTracker, ServerPush, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

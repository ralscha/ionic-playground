import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MapPage} from "../pages/map/map";
import {ListPage} from "../pages/list/list";
import {GoogleMaps} from "../providers/google-maps";
import {Connectivity} from "../providers/connectivity";
import {Locations} from "../providers/locations";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ListPage
  ],
  providers: [Locations, GoogleMaps, Connectivity, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

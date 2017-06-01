import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {AvailableRoomsPage} from "../pages/available-rooms/available-rooms";
import {BookingPage} from "../pages/booking/booking";
import {SearchPage} from "../pages/search/search";
import {Rooms} from "../providers/rooms";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AvailableRoomsPage,
    BookingPage,
    SearchPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AvailableRoomsPage,
    BookingPage,
    SearchPage
  ],
  providers: [Rooms, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}

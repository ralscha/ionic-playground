import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {Youtube} from "../providers/youtube";
import {PlaylistPage} from "../pages/playlist/playlist";
import {Safe} from "../pipes/safe";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlaylistPage,
    Safe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlaylistPage
  ],
  providers: [Youtube, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}

import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {FeedListPage} from "../pages/feed-list/feed-list";
import {FeedService} from "../providers/feed-service";
import {Storage} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    FeedListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedListPage
  ],
  providers: [FeedService, Storage, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}

import { QuotesPage } from './../pages/quotes/quotes';
import { ProfilePage } from './../pages/profile/profile';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import {AUTH_PROVIDERS} from 'angular2-jwt';

@NgModule({
  declarations: [
    MyApp,    
    TabsPage,
    ProfilePage,
    QuotesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ProfilePage,
    QuotesPage
  ],
  providers: [AUTH_PROVIDERS, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

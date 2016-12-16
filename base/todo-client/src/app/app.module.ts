import { Storage } from '@ionic/storage';
import { AddItemPage } from './../pages/add-item/add-item';
import { Data } from './../providers/data';
import { ItemDetailPage } from './../pages/item-detail/item-detail';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddItemPage,
    ItemDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddItemPage,
    ItemDetailPage
  ],
  providers: [Storage, Data, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

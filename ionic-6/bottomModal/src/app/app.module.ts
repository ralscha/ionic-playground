import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {SimpleModalPage} from './simple-modal/simple-modal.page';
import {HomePage} from './home/home.page';
import {UpdateModalPage} from './update-modal/update-modal.page';
import {ToastModalPage} from './toast-modal/toast-modal.page';
import {StyleModalPage} from './style-modal/style-modal.page';

@NgModule({
  declarations: [AppComponent, SimpleModalPage, HomePage, UpdateModalPage, ToastModalPage, StyleModalPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

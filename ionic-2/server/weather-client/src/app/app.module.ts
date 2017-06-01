import { GeocodeProvider } from './../providers/geocode-provider';
import { WeatherProvider } from './../providers/weather-provider';
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
  providers: [WeatherProvider, GeocodeProvider, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

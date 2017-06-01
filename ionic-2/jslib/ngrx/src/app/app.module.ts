import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {StoreModule} from '@ngrx/store';
import {BirthdayActions} from "../actions/birthday-actions";
import {BirthdaysReducer} from "../reducers/birthday-reducers";
import {DetailsPage} from "../pages/details/details";
import {BirthdayEffects} from "../effects/birthday.effects";
import {EffectsModule} from "@ngrx/effects";
import {BirthdayService} from "../providers/birthday-service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore({birthdays: BirthdaysReducer}),
    EffectsModule.run(BirthdayEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  providers: [BirthdayActions,BirthdayService, {
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }]
})
export class AppModule {
}

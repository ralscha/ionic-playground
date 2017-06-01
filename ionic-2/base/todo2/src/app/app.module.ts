import { Data } from './../providers/data';
import { EditTodoPage } from './../pages/edit-todo/edit-todo';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditTodoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditTodoPage
  ],
  providers: [Data, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

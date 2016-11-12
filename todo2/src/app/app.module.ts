import { Data } from './../providers/data';
import { EditTodoPage } from './../pages/edit-todo/edit-todo';
import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditTodoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditTodoPage
  ],
  providers: [Data, Storage]
})
export class AppModule {}

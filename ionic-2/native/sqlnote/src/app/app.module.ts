import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {NoteDetailPage} from "../pages/note-detail/note-detail";
import {NoteService} from "../providers/note-service";
import {Truncate} from "../pipes/truncate";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NoteDetailPage,
    Truncate
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NoteDetailPage
  ],
  providers: [NoteService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

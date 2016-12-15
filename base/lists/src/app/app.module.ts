import { NotesPage } from './../pages/notes/notes';
import { LadderPage } from './../pages/ladder/ladder';
import { GroceriesPage } from './../pages/groceries/groceries';
import { ContactsPage } from './../pages/contacts/contacts';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactsPage,
    GroceriesPage,
    LadderPage,
    NotesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactsPage,
    GroceriesPage,
    LadderPage,
    NotesPage
  ],
  providers: []
})
export class AppModule {}

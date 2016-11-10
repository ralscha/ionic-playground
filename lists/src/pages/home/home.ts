import { LadderPage } from './../ladder/ladder';
import { ContactsPage } from './../contacts/contacts';
import { NotesPage } from './../notes/notes';
import { GroceriesPage } from './../groceries/groceries';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any = GroceriesPage;
  tab2Root: any = NotesPage;
  tab3Root: any = ContactsPage;
  tab4Root: any = LadderPage;

  constructor(public navCtrl: NavController) {

  }

}

import { QuotesPage } from './../quotes/quotes';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  profilePage = ProfilePage;
  quotesPage = QuotesPage;

  constructor() {

  }
}

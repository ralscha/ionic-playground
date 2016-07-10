import {Component, Type} from '@angular/core'
import {ProfilePage} from '../profile/profile';
import {QuotesPage} from '../quotes/quotes';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  profilePage: Type = ProfilePage;
  quotesPage: Type = QuotesPage;

  constructor() {

  }
}

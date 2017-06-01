import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Contacts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  contacts;
  groupedContacts = [];

  constructor(private nav: NavController) {
    this.contacts = [
      'Kate Beckett',
      'Richard Castle',
      'Alexis Castle',
      'Lanie Parish',
      'Javier Esposito',
      'Kevin Ryan',
      'Martha Rodgers',
      'Roy Montgomery',
      'Jim Beckett',
      'Stana Katic',
      'Nathan Fillion',
      'Molly Quinn',
      'Tamala Jones',
      'Jon Huertas',
      'Seamus Dever',
      'Susan Sullivan'
    ];

    this.groupContacts(this.contacts);
  }

  groupContacts(contacts) {
    let sortedContacts = contacts.sort();
    let currentLetter = false;
    let currentContacts = [];

    sortedContacts.forEach((value, index) => {
      if (value.charAt(0) != currentLetter) {
        currentLetter = value.charAt(0);
        let newGroup = {
          letter: currentLetter,
          contacts: []
        };
        currentContacts = newGroup.contacts;
        this.groupedContacts.push(newGroup);
      }
      currentContacts.push(value);
    });
  }

}
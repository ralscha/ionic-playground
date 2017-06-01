import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {EventCreatePage} from "../event-create/event-create";
import {EventListPage} from "../event-list/event-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: NavController) {

  }

  goToProfile() {
    this.nav.push(ProfilePage);
  }

  goToCreate(){
    this.nav.push(EventCreatePage);
  }

  goToList(){
    this.nav.push(EventListPage);
  }

}

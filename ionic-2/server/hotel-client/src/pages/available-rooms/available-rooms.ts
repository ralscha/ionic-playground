import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BookingPage} from "../booking/booking";


@Component({
  selector: 'page-available-rooms',
  templateUrl: 'available-rooms.html'
})
export class AvailableRoomsPage {

  rooms: any;

  constructor(public nav: NavController, public navParams: NavParams) {
    this.rooms = this.navParams.get('rooms');
  }

  bookRoom(room) {
    this.nav.push(BookingPage, {
      room: room,
      details: this.navParams.get('details')
    });
  }

}

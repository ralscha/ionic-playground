import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {Rooms} from "../../providers/rooms";
import {AvailableRoomsPage} from "../available-rooms/available-rooms";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  roomType: any;
  guests: any;
  beds: any;
  priceRange: any;
  from: any;
  to: any;

  constructor(public nav: NavController, public roomsService: Rooms,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.priceRange = {
      lower: 0,
      upper: 500
    };

    this.roomType = 'STANDARD';
    this.guests = 1;
    this.beds = 1;
    this.from = today.toISOString();
    this.to = tomorrow.toISOString();

  }

  findRooms() {

    const loading = this.loadingCtrl.create({
      content: "Finding rooms..."
    });
    loading.present();

    const options = {
      roomType: this.roomType,
      guests: this.guests,
      beds: this.beds,
      priceRange: this.priceRange,
      from: this.from.substring(0, 10),
      to: this.to.substring(0, 10)
    };

    this.roomsService.getRooms(options).then((data) => {
      loading.dismiss();

      if (data === null) {
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Sorry, no rooms could be found for your search criteria.',
          buttons: ['Ok']
        });
        alert.present();
      } else {
        this.nav.push(AvailableRoomsPage, {
          rooms: data,
          details: options
        });
      }

    }, (err) => {
      console.log(err);
    });

  }

}

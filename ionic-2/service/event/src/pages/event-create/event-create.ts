import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {EventData} from "../../providers/event-data";

@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html'
})
export class EventCreatePage {
  eventName: string;
  eventDate: string;
  eventPrice: number;
  eventCost: number;

  constructor(public nav: NavController, public eventData: EventData) {
    this.nav = nav;
    this.eventData = eventData;
  }

  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number) {
    this.eventData.createEvent(eventName, eventDate, eventPrice, eventCost).then( () => {
      this.nav.pop();
    });
  }

}

import { PropertyDetailPage } from './../property-detail/property-detail';
import { PropertyService } from './../../providers/property-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-favorite-list',
  templateUrl: 'favorite-list.html'
})
export class FavoriteListPage {

  properties: Array<any>;
  propertyService: PropertyService;

  constructor(public navCtrl: NavController, public service: PropertyService) {
    this.propertyService = service;
    this.properties = this.propertyService.getFavorites();
  }

  itemTapped(property) {
    this.navCtrl.push(PropertyDetailPage, property);
  }

  deleteItem(property) {
    this.propertyService.unfavorite(property);
  }

}

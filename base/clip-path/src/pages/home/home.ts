import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  images: any = [];

  constructor(public navCtrl: NavController) {

    this.images = [
      {imagePath: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d', toBeDeleted: false},
      {imagePath: 'https://images.unsplash.com/photo-1498454056553-879ad1baf5dc', toBeDeleted: false},
      {imagePath: 'https://images.unsplash.com/photo-1498078675142-85259d452c6b', toBeDeleted: false},
      {imagePath: 'https://images.unsplash.com/photo-1495121864268-11b119abeba0', toBeDeleted: false},
      {imagePath: 'https://images.unsplash.com/photo-1495904786722-d2b5a19a8535', toBeDeleted: false},
      {imagePath: 'https://images.unsplash.com/photo-1485110168560-69d4ac37b23e', toBeDeleted: false},
      {imagePath: 'https://images.unsplash.com/photo-1492934867615-2a451e01c063', toBeDeleted: false}
    ];

  }

  toggleImageDelete(image) {
    image.toBeDeleted = !image.toBeDeleted;
  }

}

import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})
export class GalleryPage {
  private images: Array<string>;
  grid: Array<Array<string>>;

  constructor(private _navCtrl: NavController, private _navParams: NavParams) {
    this.images = this._navParams.get('images');
    this.grid = Array(Math.ceil(this.images.length / 2));

    let rowNum = 0;

    for (let i = 0; i < this.images.length; i += 2) {

      this.grid[rowNum] = Array(2);

      if (this.images[i]) {
        this.grid[rowNum][0] = this.images[i]
      }

      if (this.images[i + 1]) {
        this.grid[rowNum][1] = this.images[i + 1]
      }

      rowNum++;
    }
  }

}

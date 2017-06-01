import { CatProvider } from './../../providers/cat-provider';
import { Cat } from './../../providers/cat';
import { Component } from '@angular/core';
import { DeviceMotion } from 'ionic-native';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cats: Array<Cat>;
  private lastX: number;
  private lastY: number;
  private lastZ: number;
  private moveCounter: number = 0;

  constructor(private catProvider: CatProvider, private navController: NavController, platform: Platform) {
    this.loadCats();

    platform.ready().then(() => {
      DeviceMotion.watchAcceleration({ frequency: 200 }).subscribe(acc => {

        if (!this.lastX) {
          this.lastX = acc.x;
          this.lastY = acc.y;
          this.lastZ = acc.z;
          return;
        }

        let deltaX: number, deltaY: number, deltaZ: number;
        deltaX = Math.abs(acc.x - this.lastX);
        deltaY = Math.abs(acc.y - this.lastY);
        deltaZ = Math.abs(acc.z - this.lastZ);

        if (deltaX + deltaY + deltaZ > 3) {
          this.moveCounter++;
        } else {
          this.moveCounter = Math.max(0, --this.moveCounter);
        }

        if (this.moveCounter > 2) {
          this.loadCats();
          this.moveCounter = 0;
        }

        this.lastX = acc.x;
        this.lastY = acc.y;
        this.lastZ = acc.z;

      });
    });

  }

  loadCats() {
    this.catProvider.load().then(result => {
      this.cats = result;
    });
  }

}

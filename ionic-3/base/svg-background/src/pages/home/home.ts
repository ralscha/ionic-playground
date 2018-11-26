import {Component, Renderer2} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as dateFns from 'date-fns';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  timeOfDay: Date = new Date();
  timeString: string = '12:00';

  sky: any;
  entireSun: any;
  allClouds: any;
  clouds: any;

  constructor(public navCtrl: NavController, public renderer: Renderer2) {
  }

  ionViewDidLoad() {

    this.timeString = dateFns.format(this.timeOfDay, 'h:mm A');

    this.sky = document.querySelector('linearGradient [offset="1"]');
    this.entireSun = document.querySelector('#Sun');
    this.clouds = document.querySelectorAll('#Clouds path');

    this.setTransitions();

  }

  setTransitions() {

    this.renderer.setStyle(this.sky, 'transition', '1s linear');
    this.renderer.setStyle(this.entireSun, 'transition', '1s linear');

    this.clouds.forEach((cloud) => {
      this.renderer.setStyle(cloud, 'transition', '1s linear');
    });

  }

  setNight() {

    this.renderer.setAttribute(this.sky, 'stop-color', '#141944');
    this.renderer.setAttribute(this.entireSun, 'transform', 'translate(1, 2000)');
    this.renderer.setAttribute(this.entireSun, 'opacity', '1');

    this.clouds.forEach((cloud) => {
      this.renderer.setStyle(cloud, 'fill', '#fff');
      this.renderer.setStyle(cloud, 'opacity', '0.2');
    });

  }

  setDay() {

    this.renderer.setAttribute(this.sky, 'stop-color', '#50a7dd');
    this.renderer.setAttribute(this.entireSun, 'opacity', '1');
    this.renderer.setAttribute(this.entireSun, 'transform', 'translate(1, 1)');

    this.clouds.forEach((cloud) => {
      this.renderer.setStyle(cloud, 'fill', '#fff');
      this.renderer.setStyle(cloud, 'opacity', '1');
    });

  }

  setSunset() {

    this.renderer.setAttribute(this.entireSun, 'transform', 'translate(1, 1000)');
    this.renderer.setAttribute(this.entireSun, 'opacity', '1');
    this.renderer.setAttribute(this.sky, 'stop-color', '#e2905a');

    this.clouds.forEach((cloud) => {
      this.renderer.setStyle(cloud, 'fill', '#e2c1d8');
      this.renderer.setStyle(cloud, 'opacity', '0.4');
    });

  }

  setCloudy() {
    this.renderer.setAttribute(this.sky, 'stop-color', '#cecece');
    this.renderer.setAttribute(this.entireSun, 'transform', 'translate(1, 1)');
    this.renderer.setAttribute(this.entireSun, 'opacity', '0.2');

    this.clouds.forEach((cloud) => {
      this.renderer.setStyle(cloud, 'fill', '#fff');
      this.renderer.setStyle(cloud, 'opacity', '1');
    });
  }

}

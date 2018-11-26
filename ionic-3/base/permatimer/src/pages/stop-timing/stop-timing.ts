import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-stop-timing',
  templateUrl: 'stop-timing.html'
})
export class StopTimingPage {

  elapsedTime: any = 0;
  hours: any;
  minutes: any;
  seconds: any;

  constructor(private readonly navParams: NavParams,
              private readonly viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.elapsedTime = this.navParams.get('elapsedTime');
    this.minutes = Math.floor(this.elapsedTime / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.seconds = Math.floor(this.elapsedTime % 60);
  }

  submitTime() {
    const modifiedSeconds = (this.hours * 60 * 60) + (this.minutes * 60) + this.seconds;
    this.viewCtrl.dismiss(modifiedSeconds);
  }

}

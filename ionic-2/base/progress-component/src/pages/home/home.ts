import {Component} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loadProgress = 0;
  subscription: Subscription;

  startProgress() {
    this.loadProgress = 0;
    this.stopProgress();
    this.subscription = Observable.interval(100).take(101)
      .subscribe(
        data => this.loadProgress = data,
        e => console.log('error', e),
        () => this.subscription = null);
  }

  stopProgress() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

}

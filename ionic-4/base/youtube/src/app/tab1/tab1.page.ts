import { Component } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import homeData from '../../assets/data/home.json';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  videos: any[] = [];
  segments: any[] = [];

  constructor() {
    this.segments = [
      'All',
      'New to you',
      'Gaming',
      'Sitcoms',
      'Computer program',
      'Documentary',
      'Music',
    ].map((val) => ({
      title: val,
      selected: false,
    }));
    setTimeout(() => {
      this.selectSegment(0);
      this.videos = homeData;
    }, 1000);
  }

  doRefresh(event: Event) {
    setTimeout(() => {
      (event as RefresherCustomEvent).target.complete();
    }, 1500);
  }

  selectSegment(i: any) {
    this.segments.map((item) => (item.selected = false));
    this.segments[i].selected = true;
  }
}

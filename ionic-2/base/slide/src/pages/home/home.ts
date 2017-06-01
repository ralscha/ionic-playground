import { ImageSearch } from './../../providers/image-search';
import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  search: string;
  slides: any[];
  haveData: boolean = false;

  constructor(public searchProvider: ImageSearch) {
  }

  doSearch() {
    console.log('searching for ' + this.search);
    this.searchProvider.search(this.search).subscribe(data => {
      console.log(data);
      if (data.length >= 1) {
        this.haveData = true;
        this.slides = data;
      }
    });
  }

}
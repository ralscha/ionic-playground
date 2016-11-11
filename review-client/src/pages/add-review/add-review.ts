import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {Review} from '../../Review';

@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html'
})
export class AddReviewPage {

  title: any;
  description: any;
  rating: any;

  constructor(public viewCtrl: ViewController) {
  }

  save(): void {
 
    let review: Review = {
      title: this.title,
      description: this.description,
      rating: this.rating
    };

    this.viewCtrl.dismiss(review);
  }

  close(): void {
    this.viewCtrl.dismiss();
  }
}
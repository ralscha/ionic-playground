import { Review } from './../../review';
import { Reviews } from './../../providers/reviews';
import { AddReviewPage } from './../add-review/add-review';
import { Component } from "@angular/core";
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  reviews: Review[];

  constructor(public reviewService: Reviews, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.reviewService.getReviews().subscribe((data) => {
      this.reviews = data;
    });
  }

  addReview() {
    let modal = this.modalCtrl.create(AddReviewPage);
    modal.onDidDismiss(review => {
      if (review) {
        this.reviews.push(review);
        this.reviewService.createReview(review).subscribe(id => review.id = id);
      }
    });

    modal.present();
  }

  deleteReview(review: Review) {
    //Remove locally
    let index = this.reviews.indexOf(review);

    if (index > -1) {
      this.reviews.splice(index, 1);
    }

    //Remove from database
    this.reviewService.deleteReview(review.id);
  }

}
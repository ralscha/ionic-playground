import {Component} from "@angular/core";
import {NavController, Modal} from 'ionic-angular';
import {AddReviewPage} from '../add-review/add-review';
import {Reviews} from '../../providers/reviews/reviews';
import {Review} from '../../Review.ts';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    reviews: Review[];

    constructor(private nav: NavController, private reviewService: Reviews) {

    }

    ionViewLoaded() {

        this.reviewService.getReviews().then((data) => {
            this.reviews = data;
        });

    }

    addReview() {

        let modal = Modal.create(AddReviewPage);

        modal.onDismiss(review => {
            if (review) {
                this.reviews.push(review);
                this.reviewService.createReview(review).then(id=>review.id=id);
            }
        });

        this.nav.present(modal);

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
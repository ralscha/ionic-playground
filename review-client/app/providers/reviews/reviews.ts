import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Review} from '../../Review.ts';

@Injectable()
export class Reviews {

  private endpoint: string = 'http://localhost:8888/api';
  private reviews: Review[];

  constructor(private http: Http) {
    this.reviews = null;
  }

  getReviews(): Promise<Review[]> {
    if (this.reviews) {
      return Promise.resolve(this.reviews);
    }

    return new Promise(resolve => {
      this.http.get(this.endpoint + '/reviews')
        .map(res => res.json())
        .subscribe(data => {
          this.reviews = data;
          resolve(this.reviews);
        });
    });
  }

  createReview(review: Review): Promise<string> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(resolve => {
      this.http.post(this.endpoint + '/reviews', JSON.stringify(review), { headers: headers })
        .subscribe(res => resolve(res.text()));
    });
  }

  deleteReview(id: string): void {
    this.http.delete(this.endpoint + '/reviews/' + id).subscribe(() => { });
  }

}
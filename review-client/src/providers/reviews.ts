import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Review } from '../Review';
import { Observable } from 'rxjs'

@Injectable()
export class Reviews {

  private endpoint: string = 'http://localhost:8888/api';
  private reviews: Review[];
  observable: Observable<Review[]>;

  constructor(private http: Http) {
    this.reviews = null;
  }

  getReviews(): Observable<Review[]> {
    if (this.reviews) {
      return Observable.of(this.reviews);
    }
    else if (this.observable) {
      return this.observable;
    }
    else {
      this.observable = this.http.get(this.endpoint + '/reviews')
        .map(res => res.json())
        .do(val => {
          this.reviews = val;
          this.observable = null;
        })
        .share();
      return this.observable;
    }
  }

  createReview(review: Review): Observable<string> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.endpoint + '/reviews', JSON.stringify(review), { headers: headers })
      .map(res => res.text());

  }

  deleteReview(id: string): void {
    this.http.delete(this.endpoint + '/reviews/' + id).subscribe(() => { });
  }

}
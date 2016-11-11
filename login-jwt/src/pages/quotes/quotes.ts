import { AuthService } from './../../providers/auth-service';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html'
})
export class QuotesPage {
  API: string = "http://localhost:8080";
  quote: { id: number, joke: string };
  error: string;
  auth: AuthService;

  constructor(private http: Http, private authHttp: AuthHttp) {
    this.auth = AuthService;
  }

  getQuote() {
    // Use a regular Http call to access unsecured routes
    this.http.get(`${this.API}/quote`)
      .map(res => res.json())
      .subscribe(
      data => this.quote = data,
      err => this.error = err
      );
  }

  getSecretQuote() {
    // Use authHttp to access secured routes
    this.authHttp.get(`${this.API}/secure-quote`)
      .map(res => res.json())
      .subscribe(
      data => this.quote = data,
      err => this.error = err
      );
  }
}

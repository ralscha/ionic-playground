import { AuthService } from './../../providers/auth-service';
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map'

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    private LOGIN_URL: string = "http://localhost:8080/login";
    private SIGNUP_URL: string = "http://localhost:8080/signup";

    auth: AuthService;
    // When the page loads, we want the Login segment to be selected
    authType: string = "login";
    // We need to set the content type for the server
    jsonContentHeader: Headers = new Headers({ "Content-Type": "application/json" });
    formContentHeader: Headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });

    error: string;
    jwtHelper: JwtHelper = new JwtHelper();
    user: string;

    constructor(private http: Http) {
        this.auth = AuthService;
        var token = localStorage.getItem('id_token');
        if (token) {
          this.user = this.jwtHelper.decodeToken(token).sub;
        }
        else {
          this.user = null;
        }
    }

    login(credentials) {
        var postBody = `username=${credentials.username}&password=${credentials.password}`;

        this.http.post(this.LOGIN_URL, postBody, { headers: this.formContentHeader })
            .map(res => res.json())
            .subscribe(
            data => this.authSuccess(data.id_token),
            err => this.error = err
            );
    }

    signup(credentials) {
        this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.jsonContentHeader })
            .map(res => res.json())
            .subscribe(
            data => this.authSuccess(data.id_token),
            err => this.error = err
            );
    }

    logout() {
        localStorage.removeItem('id_token');
        this.user = null;
    }

    authSuccess(token) {
        this.error = null;
        localStorage.setItem('id_token', token);
        this.user = this.jwtHelper.decodeToken(token).sub;
    }

}

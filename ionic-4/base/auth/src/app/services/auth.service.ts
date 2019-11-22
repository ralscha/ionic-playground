import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user: Observable<any>;
    private userData = new BehaviorSubject(null);

    constructor(private http: HttpClient, private plt: Platform, private router: Router) {
        this.loadStoredToken();
    }

    loadStoredToken() {
        const platformObs = from(this.plt.ready());

        this.user = platformObs.pipe(
            switchMap(() => of(localStorage.getItem(TOKEN_KEY))),
            map(token => {
                if (token) {
                    const decoded = helper.decodeToken(token);
                    this.userData.next(decoded);
                    return true;
                } else {
                    return null;
                }
            })
        );
    }

    login(credentials: { email: string, pw: string }) {
        // Normally make a POST request to your APi with your login credentials
        if (credentials.email !== 'saimon@devdactic.com' || credentials.pw !== '123') {
            return of(null);
        }

        return this.http.get('https://randomuser.me/api/').pipe(
            take(1),
            map(res => {
                // Extract the JWT, here we just fake it
                return `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1Njc2NjU3MDYsImV4cCI6MTU5OTIwMTcwNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiMTIzNDUiLCJmaXJzdF9uYW1lIjoiU2ltb24iLCJsYXN0X25hbWUiOiJHcmltbSIsImVtYWlsIjoic2FpbW9uQGRldmRhY3RpYy5jb20ifQ.4LZTaUxsX2oXpWN6nrSScFXeBNZVEyuPxcOkbbDVZ5U`;
            }),
            switchMap(token => {
                const decoded = helper.decodeToken(token);
                this.userData.next(decoded);
                localStorage.setItem(TOKEN_KEY, token);
                return of(true);
            })
        );
    }

    getUser() {
        return this.userData.getValue();
    }

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        this.router.navigateByUrl('/');
        this.userData.next(null);
    }

}

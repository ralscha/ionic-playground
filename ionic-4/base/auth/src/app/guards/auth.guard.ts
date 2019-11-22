import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AlertController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {map, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.auth.user.pipe(
            take(1),
            map(user => {
                if (!user) {
                    this.alertCtrl.create({
                        header: 'Unauthorized',
                        message: 'You are not allowed to access that page.',
                        buttons: ['OK']
                    }).then(alert => alert.present());

                    return this.router.createUrlTree(['/']);
                } else {
                    return true;
                }
            })
        );

    }

}

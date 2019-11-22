import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    credentials = {
        email: 'saimon@devdactic.com',
        pw: '123'
    };

    constructor(
        private auth: AuthService,
        private router: Router,
        private alertCtrl: AlertController
    ) {
    }

    ngOnInit() {
    }

    login() {
        this.auth.login(this.credentials).subscribe(async res => {
            if (res) {
                this.router.navigateByUrl('/members');
            } else {
                const alert = await this.alertCtrl.create({
                    header: 'Login Failed',
                    message: 'Wrong credentials.',
                    buttons: ['OK']
                });
                await alert.present();
            }
        });
    }
}

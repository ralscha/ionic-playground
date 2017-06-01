import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Dialogs, SecureStorage} from 'ionic-native';
import {LoginProvider} from "../../providers/login-provider";
import {MainPage} from "../main/main";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public username: string;
  public password: string;
  public readyToLogin: boolean;
  private secureStorage: SecureStorage;

  constructor(private readonly navCtrl: NavController, private readonly platform: Platform, private readonly loginProvider: LoginProvider) {
    this.readyToLogin = false;

    platform.ready().then(() => {

      this.secureStorage = new SecureStorage();
      this.secureStorage.create('demoapp').then(
        () => {
          console.log('Storage is ready!');

          this.secureStorage.get('loginInfo')
            .then(
              data => {
                console.log('data was ' + data);
                ({u: this.username, p: this.password} = JSON.parse(data));
                this.login();
              },
              error => {
                // do nothing - it just means it doesn't exist
              }
            );

          this.readyToLogin = true;
        },
        error => console.log(error)
      );

    });

  }

  login() {
    this.loginProvider.login(this.username, this.password).subscribe((res) => {
      if (res.success) {
        //securely store
        this.secureStorage.set('loginInfo', JSON.stringify({u: this.username, p: this.password}))
          .then(data => console.log('stored info'),
            error => console.log(error));

        this.navCtrl.setRoot(MainPage, null, {
          animate: true
        });

      } else {
        Dialogs.alert('Bad login. Use \'password\' for password.', 'Bad Login', 'Ok');
        this.secureStorage.remove('loginInfo');
      }

    });

  }

}

import {Component} from '@angular/core';
import md5 from 'crypto-md5';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email: any;
  password: any;
  profilePicture: any = "https://www.gravatar.com/avatar/"


  emailChanged() {
    this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex');
  }

}

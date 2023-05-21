import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  user: any = null;

  constructor(private auth: AuthService) {
  }

  ionViewWillEnter(): void {
    this.user = this.auth.getUser();
  }

  logout(): void {
    this.auth.logout();
  }
}

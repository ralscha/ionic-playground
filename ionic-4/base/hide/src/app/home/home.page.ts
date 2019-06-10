import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({opacity: 0}), animate('200ms ease-in', style({opacity: 1}))]),
      transition(':leave', [animate('200ms ease-in', style({opacity: 0}))])
    ])
  ]
})
export class HomePage implements OnInit {

  authenticated = false;

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUser$().subscribe(state => {
      this.authenticated = state !== null;
    });
  }

  loginAdmin() {
    this.authService.login('admin');
  }

  loginUser() {
    this.authService.login('user');
  }

  logout() {
    this.authService.logout();
  }

}

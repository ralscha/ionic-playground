import {Component} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  user = {
    name: 'Simon Grimm',
    website: 'www.ionicacademy.com',
    address: {
      zip: 48149,
      city: 'Muenster',
      country: 'DE'
    },
    interests: [
      'Ionic', 'Angular', 'YouTube', 'Sports'
    ]
  };

  constructor(private readonly router: Router, private readonly dataService: DataService) { }

  openDetailsWithQueryParams() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.user)
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }

  openDetailsWithService() {
    this.dataService.setData(42, this.user);
    this.router.navigateByUrl('/details/42');
  }

  openDetailsWithState() {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }
}

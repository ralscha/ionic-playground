import {Component} from '@angular/core';
import {FlashService} from '../flash.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  constructor(private readonly flashService: FlashService) {
  }


  testFlash(): void {
    this.flashService.show('Base is under attack!', 2000, 'danger');
  }
}

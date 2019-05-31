import {Component} from '@angular/core';
import {FlashService} from '../flash.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  constructor(private flashService: FlashService) {

  }

  ionViewDidLoad(){

  }

  testFlash(){
    this.flashService.show('Base is under attack!', 2000, 'danger');
  }
}

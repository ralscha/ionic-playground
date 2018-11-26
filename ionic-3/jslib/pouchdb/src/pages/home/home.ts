import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public hasComics: boolean = false;
  public comics: any;

  constructor(private navCtrl: NavController,
              private DB: DatabaseProvider) {

  }

  ionViewWillEnter() {
    this.displayComics();
  }

  displayComics() {
    this.DB.retrieveComics().then((data) => {
      let existingData = Object.keys(data).length;
      if (existingData !== 0) {
        this.hasComics = true;
        this.comics = data;
      }
      else {
        console.log("we get nada!");
        this.hasComics = false;
        this.comics = null;
      }
    });
  }

  addCharacter() {
    this.navCtrl.push('AddPage');
  }

  viewCharacter(param) {
    this.navCtrl.push('AddPage', param);
  }

}

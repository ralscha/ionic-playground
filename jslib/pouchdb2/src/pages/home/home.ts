import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Database} from "../../providers/database";
import {AddPage} from "../add/add";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public hasComics: boolean = false;
  public comics: any;

  constructor(public navCtrl: NavController,
              public db: Database) {
  }

  ionViewWillEnter() {
    this.displayComics();
  }

  displayComics() {
    this.db.retrieveComics().then((data) => {
      let existingData = Object.keys(data).length;
      if (existingData !== 0) {
        this.hasComics = true;
        this.comics = data;
      }
      else {
        console.log("we get nada!");
      }
    });
  }

  addCharacter() {
    this.navCtrl.push(AddPage);
  }

  viewCharacter(param) {
    this.navCtrl.push(AddPage, param);
  }

}

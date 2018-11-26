import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { ReactionsPage } from '../../pages/reactions/reactions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController) {
    // THIS IS JUST FOR TESTING
    window.addEventListener("contextmenu", (e) => { e.preventDefault(); });
  }

  showReactions(ev){
    const reactions = this.popoverCtrl.create(ReactionsPage);
    reactions.present({
      ev: ev
    });
  }

  like(){
    console.log("like");
  }

}

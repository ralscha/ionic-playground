import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import marked from 'marked';
import {Content} from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  toggleVal: boolean = false;
  plainText: string = "# hello";

  constructor(public navCtrl: NavController) {
  }

  convert(this) {
    if (this.toggleVal == true) {
      if (this.plainText && this.plainText !== '') {
        this.markdownText = marked(this.plainText.toString())
        this.content = this.markdownText
      } else {
        this.toggleVal = false
      }
    }
  }


}

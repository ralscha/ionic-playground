import {Component} from '@angular/core';
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public param = {value: 'world'};

  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang("en");
    this.translate.use("en");

    this.translate.get('HELLO', {value: 'world'}).subscribe((res: string) => {
      console.log(res);
      //=> 'hello world'
    });
  }

  changeLanguage(lang:string):void {
    this.translate.use(lang);
  }

}

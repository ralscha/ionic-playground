import { Component } from '@angular/core';
import {TestProvider} from "../../providers/test-provider";

@Component({
  selector: 'page-page-one',
  templateUrl: 'page-one.html'
  //,providers: [TestProvider]
})
export class PageOnePage {

  constructor(private readonly testProvider: TestProvider) {
  }

  changeMessage(){
    this.testProvider.setMessage("Page one rocks!");
  }

}

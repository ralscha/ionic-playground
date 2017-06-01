import {Component} from '@angular/core';
import {TestProvider} from "../../providers/test-provider";

@Component({
  selector: 'page-page-two',
  templateUrl: 'page-two.html'
  //,providers: [TestProvider]
})
export class PageTwoPage {

  constructor(private testProvider: TestProvider) {
  }

  changeMessage() {
    this.testProvider.setMessage("Page two rocks!");
  }

}

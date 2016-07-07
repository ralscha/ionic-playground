import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TestProvider } from '../../providers/test-provider/test-provider';
 
@Component({
  templateUrl: 'build/pages/page-two/page-two.html'
  // ,providers: [TestProvider]
})
export class PageTwoPage {
 
    constructor(private nav: NavController, private testProvider: TestProvider) {
    }
 
    changeMessage(){
        this.testProvider.setMessage("Page two rocks!");
    }
 
}
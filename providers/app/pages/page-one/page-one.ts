import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TestProvider } from '../../providers/test-provider/test-provider';

@Component({
  templateUrl: 'build/pages/page-one/page-one.html'
    // ,providers: [TestProvider]
})
export class PageOnePage {
 
    constructor(private nav: NavController, private testProvider: TestProvider) {
 
    }
 
    changeMessage(){
        this.testProvider.setMessage("Page one rocks!");
    }
 
}
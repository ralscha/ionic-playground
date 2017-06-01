import { Component } from '@angular/core';

import {PageOnePage} from "../page-one/page-one";
import {PageTwoPage} from "../page-two/page-two";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any = PageOnePage;
  tab2Root: any = PageTwoPage;

}

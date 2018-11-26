import {Component} from '@angular/core';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {SmartAudioProvider} from "../../providers/smart-audio/smart-audio";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private readonly smartAudio: SmartAudioProvider) {
  }

  changeTab() {
    this.smartAudio.play('tabSwitch');
  }

}

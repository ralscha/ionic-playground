import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  passedId = null;

  constructor(private readonly navParams: NavParams,
              private readonly popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    this.passedId = this.navParams.get('myid');
  }

  closePopover() {
    this.popoverCtrl.dismiss();
  }

}

import {FlashService} from '../flash.service';
import {Component, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {TimeBarComponent} from '../time-bar/time-bar.component';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
  animations: [
    trigger('messageState', [
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-out')
      ]),
      transition('* => void', [
        animate('200ms ease-in', style({opacity: '0'}))
      ])
    ])
  ]
})
export class FlashComponent {

  @ViewChild(TimeBarComponent) set tb(timeBar: TimeBarComponent) {

    if (typeof (timeBar) !== 'undefined') {
      timeBar.startTimer(this.duration);
    }

  }

  active = false;
  message = '';
  private duration: number;
  private timeout;
  activeClass = 'secondary';

  constructor(private readonly flashService: FlashService) {
    this.flashService.show = this.show.bind(this);
    this.flashService.hide = this.hide.bind(this);
  }

  show(message, duration, type?) {
    this.message = message;
    this.active = true;
    this.duration = duration;

    if (type) {
      this.activeClass = type;
    }

    this.timeout = setTimeout(() => {
      this.active = false;
    }, duration);
  }

  hide() {
    this.active = false;
    clearTimeout(this.timeout);
  }

}

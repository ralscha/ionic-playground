import {Component, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.scss'],
})
export class TimeBarComponent {

  constructor(private renderer: Renderer2, private element: ElementRef) {
  }

  startTimer(time) {
    this.renderer.setStyle(this.element.nativeElement.children[0], 'transition', 'width ' + time + 'ms linear');
    setTimeout(() => {
      this.renderer.setStyle(this.element.nativeElement.children[0], 'width', '0%');
    }, 0);
  }

}

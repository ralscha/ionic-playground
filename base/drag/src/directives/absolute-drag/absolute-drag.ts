import {Directive, Input, ElementRef, Renderer2} from '@angular/core';
import {DomController} from 'ionic-angular';

@Directive({
  selector: '[absolute-drag]'
})
export class AbsoluteDragDirective {

  @Input('startLeft') startLeft: any;
  @Input('startTop') startTop: any;

  constructor(public element: ElementRef, public renderer: Renderer2, public domCtrl: DomController) {
  }

  ngAfterViewInit() {

    this.renderer.setStyle(this.element.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
    this.renderer.setStyle(this.element.nativeElement, 'top', this.startTop + 'px');

    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({direction: window['Hammer'].DIRECTION_ALL});

    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });

  }

  handlePan(ev) {

    let newLeft = ev.center.x;
    let newTop = ev.center.y;

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'left', newLeft + 'px');
      this.renderer.setStyle(this.element.nativeElement, 'top', newTop + 'px');
    });

  }

}

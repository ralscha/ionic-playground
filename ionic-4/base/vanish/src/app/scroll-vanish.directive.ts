import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DomController} from '@ionic/angular';

@Directive({
  selector: '[appMyScrollVanish]'
})
export class ScrollVanishDirective implements OnInit {

  @Input('appMyScrollVanish') scrollArea: any;

  private hidden = false;
  private triggerDistance = 20;

  constructor(private element: ElementRef, private renderer: Renderer2, private domCtrl: DomController) {
  }

  ngOnInit(): void {
    const content = document.querySelector('ion-content');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    content!.addEventListener('ionScroll', (scrollEvent: any) => {
      const delta = scrollEvent.detail.deltaY;

      if (scrollEvent.detail.currentY === 0 && this.hidden) {
        this.show();
      } else if (!this.hidden && delta > this.triggerDistance) {
        this.hide();
      } else if (this.hidden && delta < -this.triggerDistance) {
        this.show();
      }

    });

  }

  initStyles(): void {

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'transition', '0.3s linear');
    });

  }

  hide(): void {

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'min-height', '0px');
      this.renderer.setStyle(this.element.nativeElement, 'height', '0px');
      this.renderer.setStyle(this.element.nativeElement, 'opacity', '0');
      this.renderer.setStyle(this.element.nativeElement, 'padding', '0');
    });

    this.hidden = true;

  }

  show(): void {

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'height', '44px');
      this.renderer.removeStyle(this.element.nativeElement, 'opacity');
      this.renderer.removeStyle(this.element.nativeElement, 'min-height');
      this.renderer.removeStyle(this.element.nativeElement, 'padding');
    });

    this.hidden = false;

  }

}

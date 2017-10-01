import { Directive, ContentChildren, Renderer2, ElementRef } from '@angular/core';
import { Card, DomController } from 'ionic-angular';

@Directive({
  selector: '[focusCards]',
  host: {
    '(press)': 'onPress()'
  }
})
export class FocusCardsDirective {

  @ContentChildren(Card, {read: ElementRef}) cards;
  tappedCard: any;
  focusedCard: boolean = false;

  constructor(private renderer: Renderer2, private domCtrl: DomController) {
  }

  ngAfterViewInit() {
    this.cards.forEach((card) => {
      this.renderer.listen(card.nativeElement, 'touchstart', (ev) => {

        if (this.focusedCard) {
          this.resetStyle();
        }

        this.tappedCard = card;

      });
    });
  }

  onPress() {
    this.focusedCard = true;

    this.domCtrl.write(() => {
      this.cards.forEach((card) => {
        if (card !== this.tappedCard) {
          this.domCtrl.write(() => {
            this.renderer.setStyle(card.nativeElement, 'opacity', '0.4');
          });
        }
      });
    });

  }

  resetStyle() {

    this.focusedCard = false;

    this.cards.forEach((card) => {
      this.domCtrl.write(() => {
        this.renderer.setStyle(card.nativeElement, 'opacity', '1');
      });
    });

  }


}

import { AfterViewInit, Directive, HostListener, Input } from '@angular/core';
import {AnimationController, Animation, IonFabButton} from '@ionic/angular';

@Directive({
  selector: '[appAnimatedFab]'
})
export class AnimatedFabDirective implements AfterViewInit {
  @Input('appAnimatedFab') fabButton!: IonFabButton;
  fab!: HTMLElement

  constructor(private animationCtrl: AnimationController) { }

  shrinkAnimation!: Animation;
  expanded = true;

  ngAfterViewInit() {
    // @ts-ignore
    this.fab = this.fabButton.el;
    this.setupAnimation();
  }

  setupAnimation() {
    const textSpan = this.fab.querySelector('span');

    const shrink = this.animationCtrl.create('shrink')
      .addElement(this.fab)
      .duration(400)
      .fromTo('width', '140px', '50px');

    if (textSpan) {
      const fade = this.animationCtrl.create('fade')
        .addElement(textSpan)
        .duration(400)
        .fromTo('opacity', 1, 0)
        .fromTo('width', '70px', '0px');
      this.shrinkAnimation = this.animationCtrl.create('shrink-animation')
        .duration(400)
        .easing('ease-out')
        .addAnimation([shrink, fade]);
    }
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: CustomEvent) {
    if ($event.detail.deltaY > 0 && this.expanded) {
      // Scrolling down
      this.expanded = false;
      this.shrinkFab();
    } else if ($event.detail.deltaY < 0 && !this.expanded) {
      // Scrolling up
      this.expanded = true;
      this.expandFab();
    }
  }

  expandFab() {
    this.shrinkAnimation.direction('reverse').play();
  }

  shrinkFab() {
    this.shrinkAnimation.direction('alternate').play();
  }
}

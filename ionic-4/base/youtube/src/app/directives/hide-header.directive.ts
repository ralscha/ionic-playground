import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  Renderer2,
} from '@angular/core';
import { DomController, isPlatform } from '@ionic/angular';

enum Direction {
  downup = 1,
  down = 0,
}
@Directive({
  selector: '[appHideHeader]',
})
export class HideHeaderDirective implements AfterViewInit {
  @Input('appHideHeader') header: any;
  content: any;

  scrollDistance = isPlatform('ios') ? 88 : 112;
  previousY = 0;
  direction: Direction = Direction.down;
  saveY = 0;

  constructor(
    private renderer: Renderer2,
    private domCtrl: DomController,
    private elRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    // Skip some events that create ugly glitches
    if ($event.detail.currentY <= 0 || $event.detail.currentY === this.saveY) {
      return;
    }

    const scrollTop: number = $event.detail.scrollTop;
    let newDirection = Direction.down;

    // Calculate the distance from top based on the previousY
    // which is set when we change directions
    let newPosition = -scrollTop + this.previousY;

    // We are scrolling downup the page
    // In this case we need to reduce the position first
    // to prevent it jumping from -50 to 0
    if (this.saveY > $event.detail.currentY) {
      newDirection = Direction.downup;
      newPosition -= this.scrollDistance;
    }

    // Make our maximum scroll distance the end of the range
    if (newPosition < -this.scrollDistance) {
      newPosition = -this.scrollDistance;
    }

    const contentPosition = this.scrollDistance + newPosition;

    // Move and set the opacity of our element
    this.domCtrl.write(() => {
      this.renderer.setStyle(
        this.header,
        'top',
        Math.min(0, newPosition) + 'px'
      );

      this.renderer.setStyle(
        this.content,
        'top',
        Math.min(this.scrollDistance, contentPosition) + 'px'
      );
    });

    // Store the current Y value to see in which direction we scroll
    this.saveY = $event.detail.currentY;

    // If the direction changed, store the point of change for calculation
    if (newDirection !== this.direction) {
      this.direction = newDirection;
      this.previousY = scrollTop;
    }
  }

  ngAfterViewInit(): void {
    this.header = this.header.el;
    this.content = this.elRef.nativeElement;

    this.renderer.setStyle(this.content, 'position', `absolute`);
    this.renderer.setStyle(this.content, 'top', `${this.scrollDistance}px`);

    // Add the safe area top to completely fade out the header
    const safeArea = getComputedStyle(
      this.document.documentElement
    ).getPropertyValue('--ion-safe-area-top');

    const safeAreaValue = +safeArea.split('px')[0];
    this.scrollDistance = this.scrollDistance + safeAreaValue;
  }
}

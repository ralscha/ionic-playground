import { Component, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, AnimationController, GestureController, IonItem } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const ANIMATION_BREAKPOINT = 70;

@Component({
  selector: 'app-swipe-item',
  templateUrl: './swipe-item.component.html',
  styleUrls: ['./swipe-item.component.scss'],
})
export class SwipeItemComponent implements AfterViewInit {
  @Input('email') m: any;
  @ViewChild(IonItem, { read: ElementRef }) item: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('trash', { read: ElementRef, static: false }) trashIcon: ElementRef;
  @ViewChild('archive', { read: ElementRef }) archiveIcon: ElementRef;

  @Output() delete: EventEmitter<any> = new EventEmitter();

  bigIcon = false;

  trashAnimation: Animation;
  archiveAnimation: Animation;
  deleteAnimation: Animation;

  constructor(private router: Router, private gestureCtrl: GestureController, private animationCtrl: AnimationController) { }

  ngAfterViewInit() {
    this.setupIconAnimations();

    const style = this.item.nativeElement.style;
    const windowWidth = window.innerWidth;

    this.deleteAnimation = this.animationCtrl.create('delete-animation')
      .addElement(this.item.nativeElement)
      .duration(300)
      .easing('ease-out')
      .fromTo('height', '89px', '0');

    const moveGesture = this.gestureCtrl.create({
      el: this.item.nativeElement,
      gestureName: 'move',
      threshold: 0,
      onStart: ev => {
        style.transition = '';
      },
      onMove: ev => {
        // Make the item stand out
        this.item.nativeElement.classList.add('rounded');

        if (ev.deltaX > 0) {
          this.wrapper.nativeElement.style['background-color'] = 'var(--ion-color-primary)';
          style.transform = `translate3d(${ev.deltaX}px, 0, 0)`;
        } else if (ev.deltaX < 0) {
          this.wrapper.nativeElement.style['background-color'] = 'green';
          style.transform = `translate3d(${ev.deltaX}px, 0, 0)`;
        }

        // Check if we need to animate trash icon
        if (ev.deltaX > ANIMATION_BREAKPOINT && !this.bigIcon) {
          this.animateTrash(true);
        } else if (ev.deltaX > 0 && ev.deltaX < ANIMATION_BREAKPOINT && this.bigIcon) {
          this.animateTrash(false);
        }

        // Check if we need to animate archive icon
        if (ev.deltaX < -ANIMATION_BREAKPOINT && !this.bigIcon) {
          this.animateArchive(true);
        } else if (ev.deltaX < 0 && ev.deltaX > -ANIMATION_BREAKPOINT && this.bigIcon) {
          this.animateArchive(false);
        }

      },
      onEnd: ev => {
        style.transition = '0.2s ease-out';
        this.item.nativeElement.classList.remove('rounded');

        // Check if we are past the delete or archive breakpoint
        if (ev.deltaX > ANIMATION_BREAKPOINT) {
          style.transform = `translate3d(${windowWidth}px, 0, 0)`;
          this.deleteAnimation.play()
          this.deleteAnimation.onFinish(() => {
            this.delete.emit(true);
          });
        } else if (ev.deltaX < -ANIMATION_BREAKPOINT) {
          style.transform = `translate3d(-${windowWidth}px, 0, 0)`;
          this.deleteAnimation.play()
          this.deleteAnimation.onFinish(() => {
            this.delete.emit(true);
          });
        } else {
          style.transform = '';
        }
      }
    });

    // Don't forget to enable!
    moveGesture.enable(true);
  }

  setupIconAnimations() {
    this.trashAnimation = this.animationCtrl.create('trash-animation')
      .addElement(this.trashIcon.nativeElement)
      .duration(300)
      .easing('ease-in')
      .fromTo('transform', 'scale(1)', 'scale(1.5)');

    this.archiveAnimation = this.animationCtrl.create('archive-animation')
      .addElement(this.archiveIcon.nativeElement)
      .duration(300)
      .easing('ease-in')
      .fromTo('transform', 'scale(1)', 'scale(1.5)')
  }

  animateTrash(zoomIn) {
    this.bigIcon = zoomIn;
    if (zoomIn) {
      this.trashAnimation.direction('alternate').play();
    } else {
      this.trashAnimation.direction('reverse').play();
    }
    Haptics.impact({ style: ImpactStyle.Light });
  }

  animateArchive(zoomIn) {
    this.bigIcon = zoomIn;
    if (zoomIn) {
      this.archiveAnimation.direction('alternate').play();
    } else {
      this.archiveAnimation.direction('reverse').play();
    }
    Haptics.impact({ style: ImpactStyle.Light });
  }

  openDetails(id) {
    this.router.navigate(['tabs', 'mail', id]);
  }
}

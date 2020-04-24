import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonCard} from '@ionic/angular';
import {Animation, createAnimation} from '@ionic/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(IonCard, {read: ElementRef}) ionCardElRef: ElementRef;

  expandCard() {
    // First
    const first = this.ionCardElRef.nativeElement.getBoundingClientRect();
    console.log(first);

    // Last
    this.ionCardElRef.nativeElement.classList.add('expanded-card');
    const last = this.ionCardElRef.nativeElement.getBoundingClientRect();
    console.log(last);

    // Invert
    const invert = {
      x: first.left - last.left,
      y: first.top - last.top,
      scaleX: first.width / last.width,
      scaleY: first.height / last.height
    };

    // Play
    const expandedAnimation: Animation = createAnimation()
      .addElement(this.ionCardElRef.nativeElement)
      .duration(300)
      .easing('ease-in-out')
      .beforeStyles({
        ['transform-origin']: '0 0'
      })
      .fromTo(
        'transform',
        `translate(${invert.x}px, ${invert.y}px) scale(${invert.scaleX}, ${invert.scaleY})`,
        'translate(0, 0) scale(1, 1)'
      );

    expandedAnimation.play();
  }
}

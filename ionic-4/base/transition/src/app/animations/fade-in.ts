import { createAnimation, Animation  } from '@ionic/core';

export function myFadeInAnimation(baseEl: HTMLElement): Animation {

  const baseAnimation = createAnimation();

  const backdropAnimation = createAnimation();
  const el = baseEl.querySelector('ion-backdrop');
  if (el) {
    backdropAnimation.addElement(el);
  }

  const wrapperAnimation = createAnimation();
  const el1 = baseEl.querySelector('.modal-wrapper');
  if (el1) {
    wrapperAnimation.addElement(el1);
  }

  wrapperAnimation.beforeStyles({ opacity: 1 })
    .fromTo('translateX', '0%', '0%');

  backdropAnimation.fromTo('opacity', 0.01, 0.4);

  return baseAnimation
    .addElement(baseEl)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .duration(1000)
    .beforeAddClass('show-modal')
    .addAnimation(backdropAnimation)
    .addAnimation(wrapperAnimation);

}

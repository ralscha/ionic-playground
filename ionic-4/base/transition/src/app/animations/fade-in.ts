import { createAnimation  } from '@ionic/core';

export function myFadeInAnimation(baseEl: HTMLElement) {

  const baseAnimation = createAnimation();

  const backdropAnimation = createAnimation();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = createAnimation();
  wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

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

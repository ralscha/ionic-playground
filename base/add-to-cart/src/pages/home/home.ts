import {Component, ChangeDetectorRef} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('cartBadge', [
      state('idle', style({
        opacity: '0.3',
        transform: 'scale(1)'
      })),
      state('adding', style({
        opacity: '1',
        transform: 'scale(1.3)'
      })),
      transition('idle <=> adding', animate('300ms linear')),
      transition('void => *', [
        style({transform: 'translateX(200%)'}),
        animate('300ms ease-in-out')
      ])
    ]),
    trigger('addButton', [
      state('idle', style({
        opacity: '0.3'
      })),
      state('adding', style({
        opacity: '1',
        fontWeight: 'bold'
      })),
      transition('idle <=> adding', animate('300ms linear')),
      transition('void => *', [
        style({transform: 'translateX(200%)'}),
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class HomePage {

  items: Object[] = []
  itemsInCart: Object[] = [];
  cartBadgeState: string = 'idle';

  constructor(private changeDetector: ChangeDetectorRef) {

    this.items = [
      {title: 'Something', quantityInCart: 0, addButtonState: 'idle'},
      {title: 'Something', quantityInCart: 0, addButtonState: 'idle'},
      {title: 'Something', quantityInCart: 0, addButtonState: 'idle'},
      {title: 'Something', quantityInCart: 0, addButtonState: 'idle'}
    ];

  }

  addToCart(item) {

    item.quantityInCart += 1;
    this.itemsInCart.push(item);

    item.addButtonState = 'adding';
    this.cartBadgeState = 'adding';
    this.changeDetector.detectChanges();

  }

  addToCartFinished(item) {
    this.cartBadgeState = 'idle';
    item.addButtonState = 'idle';
  }

}

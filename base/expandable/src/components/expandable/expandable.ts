import {Component, Input} from '@angular/core';

@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html'
})
export class ExpandableComponent {

  @Input('expanded')
  expanded: boolean;

  @Input('expandHeight')
  expandHeight: number;

  currentHeight: number = 0;


  constructor() {
    console.log('Hello ExpandableComponent Component');
  }

  ngAfterViewInit() {

  }
}

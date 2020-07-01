import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements AfterViewInit {
  @ViewChild('expandWrapper', { read: ElementRef, static: true }) expandWrapper: ElementRef;
  @Input() expanded = false;
  @Input() expandHeight = '150px';

  constructor(public renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'max-height', this.expandHeight);
  }
}

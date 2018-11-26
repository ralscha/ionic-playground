import {Component, Input, ViewChild, ElementRef, Renderer2} from '@angular/core';

@Component({
    selector: 'expandable',
    templateUrl: 'expandable.html'
})
export class ExpandableComponent {

    @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
    @Input('expanded') expanded;
    @Input('expandHeight') expandHeight;

    constructor(public renderer: Renderer2) {
    }

    ngAfterViewInit() {
        this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');
    }

}
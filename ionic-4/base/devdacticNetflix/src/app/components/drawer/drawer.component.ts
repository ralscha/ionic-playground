import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  @ViewChild('drawer', { read: ElementRef }) drawer!: ElementRef;
  @Output() openStateChanged: EventEmitter<boolean> = new EventEmitter();

  title = '';

  openDrawer(title: any) {
    this.title = title;
    const drawer = this.drawer.nativeElement;
    drawer.style.transition = '.2s ease-in';
    drawer.style.transform = `translateY(-300px) `;
    this.openStateChanged.emit(true);
  }

  closeDrawer() {
    const drawer = this.drawer.nativeElement;
    drawer.style.transition = '.2s ease-out';
    drawer.style.transform = '';
    this.openStateChanged.emit(false);
  }
}

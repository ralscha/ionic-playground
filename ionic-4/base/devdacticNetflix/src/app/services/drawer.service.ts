import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  drawerOpen = new BehaviorSubject(null);

  constructor() { }

  openDrawer(title) {
    this.drawerOpen.next({open: true, title});
  }
}

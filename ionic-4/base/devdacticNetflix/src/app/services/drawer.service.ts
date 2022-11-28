import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  drawerOpen = new BehaviorSubject<{open: boolean, title: string} | null>(null);

  openDrawer(title: string) {
    this.drawerOpen.next({open: true, title});
  }
}

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashService {

  constructor() {
  }

  show(message: string, duration: number, type?: string): void {
  }

  hide(): void {
  }
}

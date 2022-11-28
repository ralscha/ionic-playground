import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashService {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  show(message: string, duration: number, type?: string): void {
    // just for demo purposes
  }

  hide(): void {
    // just for demo purposes
  }
}

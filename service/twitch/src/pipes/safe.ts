import {Injectable, Pipe} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
@Injectable()
export class Safe {

  constructor(private readonly sanitizer: DomSanitizer) {
  }

  kFormater(num: string) {
    const n = parseInt(num);
    return n > 999 ? (n / 1000).toFixed(1) + 'k' : n;
  }

  transform(value: string, type: string) {
    switch (type) {
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(`http://player.twitch.tv/?channel=${value}`);
      case 'KFormate':
        return this.kFormater(value);
    }
  }
}

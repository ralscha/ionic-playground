import {Injectable, Pipe} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
@Injectable()
export class Safe {
  constructor(protected _sanitizer: DomSanitizer) {
  }

  public transform(value: string, type: string) {
    switch (type) {
      case 'resourceUrl':
        return this._sanitizer.bypassSecurityTrustResourceUrl('https://youtube.com/embed/' + value);
      default:
        throw new Error('unable to bypass security for invalid type: $(type)');
    }
  }
}

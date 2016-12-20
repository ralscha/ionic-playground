import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'truncate'
})
@Injectable()
export class Truncate {
  transform(value: string, args: string[]) : string {
    const limit = parseInt(args[0]);
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}

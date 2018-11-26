import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'msToMins',
})
export class MsToMinsPipe implements PipeTransform {
  transform(value?: number) {
    return this.durationFromMsHelper(value);
  }
  pad2(num) {
    if (num <= 99) {
      num = ('0' + num).slice(-2);
    }
    return num;
  }
  durationFromMsHelper(ms) {
    let x: number = ms / 1000;
    let seconds: number = this.pad2(Math.floor(x % 60));
    x /= 60;
    let minutes: number = this.pad2(Math.floor(x % 60));
    x /= 60;
    let hours: number = Math.floor(x % 24);
    let newHours = hours ? this.pad2(hours) + ':' : '';
    return newHours + minutes + ':' + seconds;
  }
}

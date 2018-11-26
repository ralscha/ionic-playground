import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hoursMinutesSeconds'
})
@Injectable()
export class HoursMinutesSecondsPipe implements PipeTransform {

  transform(value, args?) {
    const minutes = Math.floor(value / 60);
    const hours = Math.floor(minutes / 60);
    const seconds = Math.floor(value % 60);
    return `${hours} hrs, ${minutes} mins, ${seconds} secs`;
  }

}

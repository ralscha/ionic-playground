import {Component} from '@angular/core';

@Component({
    selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

    progress = 0;
    oneSecondHold = false;

    holdHandler(event) {
        console.log(event);

        this.progress = event / 10;
        if (this.progress === 100) {
            console.log('do something after 1 second');
            this.oneSecondHold = true;
        }
    }

    onReset() {
        this.oneSecondHold = false;
    }

}

import {Component, Input, ElementRef} from '@angular/core';

@Component({
  selector: 'speed-reader',
  templateUrl: 'speed-reader.html',
  host: {
    '(touchstart)': 'handleTouchStart($event)',
    '(touchend)': 'stopReading()'
  }
})
export class SpeedReaderComponent {

  @Input('textToRead') text;

  word: string = "";
  index: number = 0;
  textInterval: any;
  textSpeed: number = 200;
  direction: string = 'forward';
  playing: boolean = false;

  constructor(public element: ElementRef) {
    // FOR DEVELOPMENT ONLY
    //window.addEventListener("contextmenu", function(e) { e.preventDefault(); })
  }

  ngAfterViewInit() {

    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({direction: window['Hammer'].DIRECTION_ALL});

    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });

  }

  handleTouchStart(ev) {

    clearInterval(this.textInterval);

    if (ev.touches[0].pageX < 100) {
      this.direction = 'backward';
    } else {
      this.direction = 'forward';
    }

    this.startReading();
  }

  restartReading() {

    if (this.playing) {
      clearInterval(this.textInterval);
      this.startReading();
    }

  }

  startReading() {

    this.playing = true;

    this.textInterval = setInterval(() => {

      this.word = this.text[this.index];

      if (this.index < this.text.length - 1 && this.direction == 'forward') {
        this.index++;
      }

      if (this.index >= 0 && this.direction == 'backward') {
        this.index--;
      }

      if (this.index == -1 || this.index == this.text.length) {
        clearInterval(this.textInterval);
      }

    }, this.textSpeed);


  }

  stopReading() {

    this.playing = false;
    clearInterval(this.textInterval);

  }

  handlePan(ev) {

    if (ev.additionalEvent === 'pandown') {
      this.textSpeed++;
      this.restartReading();
    } else if (ev.additionalEvent === 'panup') {
      this.textSpeed--;
      this.restartReading();
    }

  }

}

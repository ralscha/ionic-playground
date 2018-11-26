import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'smile-rate',
  templateUrl: 'smile-rate.html'
})
export class SmileRate {

  @ViewChild('smileCanvas') smileCanvas;
  smileHeight: number = 250;
  rating: number = Math.round(100 - ((250 - this.smileHeight) / 2));

  constructor() {

  }

  ngAfterViewInit(){

    let hammer = new window['Hammer'](this.smileCanvas.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });

    this.drawEyes();
    this.drawSmile();
  }

  drawEyes(){

    let ctx = this.smileCanvas.nativeElement.getContext('2d');

    ctx.beginPath();
    ctx.arc(50, 20, 15, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(200, 20, 15, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();

  }

  drawSmile(){

    let ctx = this.smileCanvas.nativeElement.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(20, 150);
    ctx.bezierCurveTo(20, this.smileHeight, 230, this.smileHeight, 230, 150);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'white';
    ctx.stroke();

  }

  redraw(){

    let ctx = this.smileCanvas.nativeElement.getContext('2d');

    ctx.clearRect(0, 0, this.smileCanvas.nativeElement.width, this.smileCanvas.nativeElement.height);
    this.drawEyes();
    this.drawSmile();
  }

  handlePan(ev){

    this.smileHeight = ev.center.y - ev.target.offsetHeight;

    if(this.smileHeight > 250){
      this.smileHeight = 250;
    } else if (this.smileHeight < 50){
      this.smileHeight = 50;
    }

    this.rating = Math.round(100 - ((250 - this.smileHeight) / 2));

    this.redraw();

  }

}

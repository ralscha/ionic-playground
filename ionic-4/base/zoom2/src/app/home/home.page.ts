import {ChangeDetectorRef, Component} from '@angular/core';
import {IonSlides, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  zoomActive = false;
  zoomScale = 1;

  constructor(private modalController: ModalController, private changeDetectorRef: ChangeDetectorRef) { }


  readonly sliderZoomOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
    zoom: {
      maxRatio: 5
    },
    on: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      zoomChange: (scale: any, imageEl: any, slideEl: any) => {
        this.zoomActive = true;
        this.zoomScale = scale / 5;
        this.changeDetectorRef.detectChanges();
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async touchEnd(zoomslides: IonSlides, card: any): Promise<void> {
    // Zoom back to normal
    const slider = await zoomslides.getSwiper();
    const zoom = slider.zoom;
    zoom.out();

    // Card back to normal
    card.el.style['z-index'] = 9;

    this.zoomActive = false;
    this.changeDetectorRef.detectChanges();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  touchStart(card: any): void {
    // Make card appear above backdrop
    card.el.style['z-index'] = 11;
  }

}

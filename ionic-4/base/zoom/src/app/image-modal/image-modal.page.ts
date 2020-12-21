import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonSlides, ModalController, ViewDidEnter} from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit, ViewDidEnter {

  @ViewChild(IonSlides) slides!: IonSlides;
  @Input('img') img!: number;

  readonly sliderOpts = {
    zoom: true
  };

  constructor(private readonly modalController: ModalController) { }

  ngOnInit(): void { }

  ionViewDidEnter(): void {
    this.slides.update();
  }

  async zoom(zoomIn: boolean): Promise<void> {
    const slider = await this.slides.getSwiper();
    const zoom = slider.zoom;
    zoomIn ? zoom.in() : zoom.out();
  }

  close(): void {
    this.modalController.dismiss();
  }

}

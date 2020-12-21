import {ChangeDetectorRef, Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ImageModalPage} from '../image-modal/image-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  readonly sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };

  constructor(private readonly modalController: ModalController, private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  async openPreview(img: number): Promise<void> {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      cssClass: 'transparent-modal',
      componentProps: {
        img
      }
    });
    modal.present();
  }
}

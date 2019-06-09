import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ImageViewerComponent} from '../component/image-viewer/image-viewer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };

  constructor(private readonly modalController: ModalController) {
  }

  async viewImage(img, title: string = '', description: string = '') {
    const modal = await this.modalController.create({
      component: ImageViewerComponent,
      componentProps: {
        imgSource: `assets/img/${img}.jpg`,
        imgTitle: title,
        imgDescription: description
      },
      cssClass: 'modal-fullscreen',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }

}

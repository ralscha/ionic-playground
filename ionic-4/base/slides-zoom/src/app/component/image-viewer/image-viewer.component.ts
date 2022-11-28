import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent {
  @Input() imgSource = '';
  @Input() imgTitle = '';
  @Input() imgDescription = '';

  slideOpts = {
    centeredSlides: 'true'
  };

  constructor(private modalController: ModalController) {
  }

  closeModal(): void {
    this.modalController.dismiss();
  }
}

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Camera, CameraOptions} from '@ionic-native/camera';


@Injectable()
export class ImageProvider {

  public cameraImage: String

  constructor(private _CAMERA: Camera) {
  }

  takePhotograph() {
    return new Promise(resolve => {
      this._CAMERA.getPicture(
        {
          destinationType: this._CAMERA.DestinationType.DATA_URL,
          targetWidth: 320,
          targetHeight: 240
        })
        .then((data) => {
          this.cameraImage = "data:image/jpeg;base64," + data;
          resolve(this.cameraImage);
        });
    });
  }

  selectPhotograph() {
    return new Promise(resolve => {
      let cameraOptions: CameraOptions = {
        sourceType: this._CAMERA.PictureSourceType.PHOTOLIBRARY,
        destinationType: this._CAMERA.DestinationType.DATA_URL,
        quality: 100,
        targetWidth: 320,
        targetHeight: 240,
        encodingType: this._CAMERA.EncodingType.JPEG,
        correctOrientation: true
      };

      this._CAMERA.getPicture(cameraOptions)
        .then((data) => {
          this.cameraImage = "data:image/jpeg;base64," + data;
          resolve(this.cameraImage);
        });

    });
  }

}

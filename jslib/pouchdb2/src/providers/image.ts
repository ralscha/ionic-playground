import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Camera} from "ionic-native";

@Injectable()
export class Image {

  public cameraImage: String

  constructor(public http: Http) {
  }

  takePhotograph() {
    return new Promise(resolve => {
      Camera.getPicture({
          destinationType: Camera.DestinationType.DATA_URL,
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
      let cameraOptions = {
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.DATA_URL,
        quality: 100,
        targetWidth: 320,
        targetHeight: 240,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true
      };

      Camera.getPicture(cameraOptions)
        .then((data) => {
          this.cameraImage = "data:image/jpeg;base64," + data;
          resolve(this.cameraImage);
        });
    });
  }

}

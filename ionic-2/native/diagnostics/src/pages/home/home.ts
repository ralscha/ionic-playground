import {Component} from '@angular/core';
import {Camera, CameraOptions, Diagnostic} from "ionic-native";
import {Platform} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public img: string;
  public cameraSupported: boolean;
  public bluetoothEnabled: boolean;
  public gpsEnabled: boolean;
  public wifiEnabled: boolean;

  constructor(platform: Platform) {
    this.img = '';
    platform.ready().then(() => {
      Diagnostic.isBluetoothEnabled().then(res=>this.bluetoothEnabled=res);
      Diagnostic.isGpsLocationEnabled().then(res=>this.gpsEnabled=res);
      Diagnostic.isWifiEnabled().then(res=>this.wifiEnabled=res);

      Diagnostic.isCameraPresent().then((res) => {
        console.log('diagnostic result', res);
        this.cameraSupported = res;
      }).catch((err) => {
        console.log('got an error using diagnostic');
        console.dir(err);
      });

    });
  }

  getPic(type: string) {
    const options: CameraOptions = {
      targetWidth: 400,
      targetHeight: 400
    };

    if (type === 'select') {
      options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
    } else {
      options.sourceType = Camera.PictureSourceType.CAMERA;
    }

    Camera.getPicture(options).then((url) => {
      this.img = url;
    });

  }

}

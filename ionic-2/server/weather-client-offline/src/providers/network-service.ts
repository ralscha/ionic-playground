import {AlertController} from "ionic-angular";
import {Network, Diagnostic} from "ionic-native";
import {Injectable} from '@angular/core';

@Injectable()
export class NetworkService {
  constructor(public alertCtlr: AlertController) {
  }

  noConnection() {
    return (Network.connection === 'none');
  }

  private showSettings() {
    Diagnostic.switchToWifiSettings();
  }

  showNetworkAlert() {
    let networkAlert = this.alertCtlr.create({
      title: 'No Internet Connection',
      message: 'Please check your internet connection.',
      buttons: [ {
          text: 'Cancel'
        },
        {
          text: 'Open Settings',
          handler: () => {
            networkAlert.dismiss().then(() => {
              this.showSettings();
            })
          }
        }
      ]
    });
    networkAlert.present();
  }
}

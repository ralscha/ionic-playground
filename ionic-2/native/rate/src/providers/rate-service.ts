import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {AppRate} from 'ionic-native';

@Injectable()
export class RateService {

  appRate: any = AppRate;

  constructor(public platform: Platform) {
    this.platform.ready().then(
      () => {
        this.appRate.preferences.storeAppURL = {
          ios: '849930087',
          android: 'market://details?id=com.ionic.viewapp'
        };
        this.appRate.preferences.usesUntilPrompt = 2;
        this.appRate.preferences.customLocale = {
          title: 'Rate Us... Pretty Please?',
          message: 'Without ratings we starve =(',
          cancelButtonLabel: 'Pass',
          rateButtonLabel: 'Rate it!',
          laterButtonLabel: 'Ask Later'
        };
      }
    )
  }

}

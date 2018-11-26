import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {SpeechRecognition} from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  matches: String[];
  isRecording = false;

  constructor(private readonly speechRecognition: SpeechRecognition,
              private readonly plt: Platform) {
  }

  isIos() {
    return this.plt.is('ios');
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }

  startListening() {
    const options = {
      language: 'de-DE'
    };

    this.speechRecognition.startListening(options).subscribe(matches => {
      this.matches = matches;
    });

    this.isRecording = true;
  }

}

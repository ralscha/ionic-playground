import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {AudioRecorder,AudioRecorderState} from "../../providers/audio-recorder";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  AudioRecorderState = AudioRecorderState;

  constructor(private readonly navCtrl: NavController,
              private readonly alertCtrl: AlertController,
              public readonly audioRecorder: AudioRecorder) {
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  startRecording() {
    try {
      this.audioRecorder.startRecording();
    }
    catch (e) {
      this.showAlert('Could not start recording.');
    }
  }

  stopRecording() {
    try {
      this.audioRecorder.stopRecording();
    }
    catch (e) {
      this.showAlert('Could not stop recording.');
    }
  }

  startPlayback() {
    try {
      this.audioRecorder.startPlayback();
    }
    catch (e) {
      this.showAlert('Could not play recording.');
    }
  }

  stopPlayback() {
    try {
      this.audioRecorder.stopPlayback();
    }
    catch (e) {
      this.showAlert('Could not stop playing recording.');
    }
  }
}

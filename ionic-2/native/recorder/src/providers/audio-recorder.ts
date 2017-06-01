import {Injectable} from '@angular/core';
import {MediaPlugin} from "ionic-native";
import {Platform} from "ionic-angular";

@Injectable()
export class AudioRecorder {

  media: MediaPlugin;
  state: AudioRecorderState = AudioRecorderState.Ready;

  constructor(private readonly platform: Platform) {
    this.platform.ready().then(() => this.media = new MediaPlugin('recording.wav'));
  }

  startRecording() {
    this.media.startRecord();
    this.state = AudioRecorderState.Recording;
  }

  stopRecording() {
    this.media.stopRecord();
    this.state = AudioRecorderState.Recorded;
  }

  startPlayback() {
    this.media.play();
    this.state = AudioRecorderState.Playing;
  }

  stopPlayback() {
    this.media.stop();
    this.state = AudioRecorderState.Ready;
  }

}

export enum AudioRecorderState {
  Ready,
  Recording,
  Recorded,
  Playing
}

import {Injectable} from "@angular/core";

@Injectable()
export class TextDataProvider {

  speedReadingText: string = "The text that you want to speed read goes here";

  constructor() {
  }

  getSpeedReadingText(){
    return this.speedReadingText.split(" ");
  }

}

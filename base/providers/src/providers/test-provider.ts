import {Injectable} from '@angular/core';

@Injectable()
export class TestProvider {

  public message: any = "I'm new here";

  setMessage(message) {
    this.message = message;
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Cat } from '../../cat.ts';


@Injectable()
export class CatProvider {
  data: Cat[];

  constructor() {
    // hard coded initial data
    this.data = [];

    for (let i = 0; i < 3; i++) {
      this.data.push(this.makeCat());
    }
  }

  makeCat(): Cat {
    return {
      "name": "Cat " + (this.data.length + 1),
      "id": +(this.data.length + 1)
    }
  }

  load(): Promise<Cat[]> {
    //add a cat
    this.data.push(this.makeCat());
    return Promise.resolve(this.data);
  }
}


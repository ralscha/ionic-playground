import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly data = [];

  setData(id, data) {
    this.data[id] = data;
  }

  getData(id) {
    return this.data[id];
  }
}

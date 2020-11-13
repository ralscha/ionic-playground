import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly data: any = [];

  setData(id: any, data: any): void {
    this.data[id] = data;
  }

  getData(id: any): any {
    return this.data[id];
  }
}

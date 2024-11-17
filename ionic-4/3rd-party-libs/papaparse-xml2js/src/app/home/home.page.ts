import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {parse} from 'papaparse';
import {Parser} from 'xml2js';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  public xmlItems: any;
  public csvItems: any;
  public tsvItems: any;

  constructor(private readonly httpClient: HttpClient) {
  }


  ngOnInit(): void {
    this.loadXML();
    this.loadCSV();
    this.loadTSV();
  }

  loadCSV(): void {
    this.httpClient.get('/assets/data/data.csv', {responseType: 'text'})
      .subscribe(data => {
        const parsedData = parse(data, {header: true});
        this.csvItems = [];
        for (const pd of parsedData.data) {
          const d: any = pd;
          this.csvItems.push({
            id: d.id,
            firstName: d.first_name,
            lastName: d.last_name,
            email: d.email
          });
        }
      });
  }

  loadTSV(): void {
    this.httpClient.get('/assets/data/data.tsv', {responseType: 'text'})
      .subscribe(data => {
        const parsedData = parse(data, {header: true});
        this.tsvItems = [];
        for (const pd of parsedData.data) {
          const d: any = pd;
          this.tsvItems.push({
            id: d.id,
            firstName: d.first_name,
            lastName: d.last_name,
            email: d.email
          });
        }
      });
  }

  loadXML(): void {
    this.httpClient.get('/assets/data/data.xml', {responseType: 'text'})
      .subscribe(data => this.parseXML(data).then(xmlData => this.xmlItems = xmlData));
  }


  parseXML(data: any): Promise<void> {
    return new Promise(resolve => {
      const arr: any = [];
      const parser = new Parser({
        trim: true,
        explicitArray: true
      });

      parser.parseString(data, (err: any, result: any) => {
        for (const obj of result.dataset.record) {
          arr.push({
            id: obj.id[0],
            firstName: obj.first_name[0],
            lastName: obj.last_name[0],
            email: obj.email[0]
          });
        }

        resolve(arr);
      });
    });
  }

}

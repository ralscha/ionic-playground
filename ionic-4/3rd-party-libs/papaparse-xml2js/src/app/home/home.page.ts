import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Papa from 'papaparse';
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


  ngOnInit() {
    this.loadXML();
    this.loadCSV();
    this.loadTSV();
  }

  loadCSV() {
    this.httpClient.get('/assets/data/data.csv', {responseType: 'text'})
      .subscribe(data => {
        const parsedData = Papa.parse(data, {header: true});
        this.csvItems = [];
        for (const d of parsedData.data) {
          this.csvItems.push({
            id: d.id,
            firstName: d.first_name,
            lastName: d.last_name,
            email: d.email
          });
        }
      });
  }

  loadTSV() {
    this.httpClient.get('/assets/data/data.tsv', {responseType: 'text'})
      .subscribe(data => {
        const parsedData = Papa.parse(data, {header: true});
        this.tsvItems = [];
        for (const d of parsedData.data) {
          this.tsvItems.push({
            id: d.id,
            firstName: d.first_name,
            lastName: d.last_name,
            email: d.email
          });
        }
      });
  }

  loadXML() {
    this.httpClient.get('/assets/data/data.xml', {responseType: 'text'})
      .subscribe(data => this.parseXML(data).then(xmlData => this.xmlItems = xmlData));
  }


  parseXML(data) {
    return new Promise(resolve => {
      const arr = [];
      const parser = new Parser({
        trim: true,
        explicitArray: true
      });

      parser.parseString(data, (err, result) => {
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

import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import xml2js from 'xml2js';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import Papa from 'papaparse';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public xmlItems: any;
    public csvItems: any;
    public tsvItems: any;

    constructor(private readonly navCtrl: NavController,
                private readonly http: Http) {
    }


    ionViewWillEnter() {
        this.loadXML();
        this.loadCSV();
        this.loadTSV();
    }

    loadCSV() {
        this.http.get('/assets/data/data.csv')
            .map(res => res.text())
            .subscribe(data => {
                const parsedData = Papa.parse(data, {header: true});
                this.csvItems = [];
                for (let d of parsedData.data) {
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
        this.http.get('/assets/data/data.tsv')
            .map(res => res.text())
            .subscribe(data => {
                const parsedData = Papa.parse(data, {header: true});
                this.tsvItems = [];
                for (let d of parsedData.data) {
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
        this.http.get('/assets/data/data.xml')
            .map(res => res.text())
            .subscribe(data => {
                this.parseXML(data)
                    .then((data) => {
                        this.xmlItems = data;
                    });
            });
    }


    parseXML(data) {
        return new Promise(resolve => {
            let arr = [];
            const parser = new xml2js.Parser({
                trim: true,
                explicitArray: true
            });

            parser.parseString(data, function (err, result) {
                for (let obj of result.dataset.record) {
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

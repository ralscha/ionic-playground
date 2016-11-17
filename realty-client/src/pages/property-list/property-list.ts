import { PropertyService } from './../../providers/property-service';
import { Component } from '@angular/core';
import { Config, NavController } from 'ionic-angular';
import { PropertyDetailPage } from '../property-detail/property-detail';
import 'leaflet';

@Component({
    selector: 'page-property-list',
    templateUrl: 'property-list.html'
})
export class PropertyListPage {

    properties: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;

    constructor(public navCtrl: NavController, public service: PropertyService, public config: Config) {
        this.findAll();
    }

    openPropertyDetail(property: any) {
        this.navCtrl.push(PropertyDetailPage, property);
    }

    onInput(event) {
        this.service.findByName(this.searchKey)
            .subscribe(data => {
                this.properties = data;
                if (this.viewMode === "map") {
                    this.showMarkers();
                }
            });
    }

    onCancel(event) {
        this.findAll();
    }

    findAll() {
        this.service.findAll()
            .subscribe(data => this.properties = data);
    }

    showMap() {
        setTimeout(() => {
            this.map = L.map("map").setView([42.361132, -71.070876], 14);
            L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.showMarkers();
        })
    }

    showMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = L.layerGroup([]);
        this.properties.forEach(property => {
            console.log(property);
            let marker: any = L.marker([property.lat, property.lng]).on('click', event => this.openPropertyDetail(event.target.data));
            marker.data = property;
            this.markersGroup.addLayer(marker);
        });
        this.map.addLayer(this.markersGroup);
    }

}

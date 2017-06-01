import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import 'rxjs/add/operator/map';
declare var google:any;

@Injectable()
export class GoogleMapsCluster {

  markerCluster: any;
  locations: any;

  constructor(public http: Http) {
    console.log('Hello GoogleMapsCluster Provider');

    this.locations = [
      {lat: -31.563910, lng: 147.154312},
      {lat: -33.718234, lng: 150.363181},
      {lat: -33.727111, lng: 150.371124},
      {lat: -33.848588, lng: 151.209834},
      {lat: -33.851702, lng: 151.216968},
      {lat: -34.671264, lng: 150.863657},
      {lat: -35.304724, lng: 148.662905},
      {lat: -36.817685, lng: 175.699196},
      {lat: -36.828611, lng: 175.790222},
      {lat: -37.750000, lng: 145.116667},
      {lat: -37.759859, lng: 145.128708},
      {lat: -37.765015, lng: 145.133858},
      {lat: -37.770104, lng: 145.143299},
      {lat: -37.773700, lng: 145.145187},
      {lat: -37.774785, lng: 145.137978},
      {lat: -37.819616, lng: 144.968119},
      {lat: -38.330766, lng: 144.695692},
      {lat: -39.927193, lng: 175.053218},
      {lat: -41.330162, lng: 174.865694},
      {lat: -42.734358, lng: 147.439506},
      {lat: -42.734358, lng: 147.501315},
      {lat: -42.735258, lng: 147.438000},
      {lat: -43.999792, lng: 170.463352}
    ];
  }

  addCluster(map) {
    if (google.maps) {

      //Convert locations into array of markers
      let markers = this.locations.map((location) => {
        return new google.maps.Marker({
          position: location,
          label: "Hello!"
        });
      });

      this.markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/m'});

    } else {
      console.warn('Google maps needs to be loaded before adding a cluster');
    }
  }

}

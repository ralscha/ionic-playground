import {Component, OnInit, OnDestroy} from "@angular/core";
import {NavController} from 'ionic-angular';
import {UUID} from 'angular2-uuid';
import {Observable} from 'rxjs/Observable';
import {Position} from '../../position';
import {Stationary} from '../../stationary';

declare var EventSource;

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit, OnDestroy {
  private uuid: string;
  private map = null;
  private marker = null;
  private eventSource = null;
  private stationaryCircles: Array<google.maps.Circle> = [];
  private currentLocationMarker: google.maps.Marker = null;
  private locationAccuracyCircle: google.maps.Circle = null;
  private path: google.maps.Polyline = null;
  private previousPosition: Position = null;
  private locationMarkers: Array<google.maps.Marker> = [];

  constructor(private navController: NavController) {
    this.uuid = UUID.UUID();
  }

  ngOnInit() {
    this.loadMap();
    this.subscribeToServer();
  }

  ngOnDestroy() {
    this.eventSource.close();
  }

  subscribeToServer() {
    this.eventSource = new EventSource("subscribe/" + this.uuid);
    //this.eventSource = new EventSource("http://192.168.178.20:8888/subscribe/" + this.uuid);

    this.eventSource.addEventListener('pos', x => this.handlePositions(JSON.parse(x.data)), false);
    this.eventSource.addEventListener('stationary', x => this.handleStationaries(JSON.parse(x.data)), false);
    //this.eventSource.addEventListener('error', x => console.error(x), false);
  }
  
  handlePositions(position: Position[]) {
     for (let i = 0; i < position.length; i++) {
         this.handlePosition(position[i]);
     }
  }

  handlePosition(position: Position) {
    const latlng = new google.maps.LatLng(position.latitude, position.longitude);

    if (!this.currentLocationMarker) {
      this.currentLocationMarker = new google.maps.Marker({
        map: this.map,
        position: latlng,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: 'gold',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 3
        }
      });
      this.locationAccuracyCircle = new google.maps.Circle({
        fillColor: 'purple',
        fillOpacity: 0.4,
        strokeOpacity: 0,
        map: this.map,
        center: latlng,
        radius: position.accuracy
      });
    }
    else {
      this.currentLocationMarker.setPosition(latlng);
      this.locationAccuracyCircle.setCenter(latlng);
      this.locationAccuracyCircle.setRadius(position.accuracy);
    }

    if (this.previousPosition) {
      this.locationMarkers.push(new google.maps.Marker({
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: 'green',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 3
        },
        map: this.map,
        position: new google.maps.LatLng(this.previousPosition.latitude, this.previousPosition.longitude)
      }));

      if (this.locationMarkers.length > 100) {
        const removedMarker = this.locationMarkers.shift();
        removedMarker.setMap(null);
      }
    }
    else {
      this.map.setCenter(latlng);
      if (this.map.getZoom() < 15) {
        this.map.setZoom(15);
      }
    }

    if (!this.path) {
      this.path = new google.maps.Polyline({
        map: this.map,
        strokeColor: 'blue',
        strokeOpacity: 0.4
      });
    }
    const pathArray = this.path.getPath();
    pathArray.push(latlng);
    if (pathArray.getLength() > 100) {
      pathArray.removeAt(0);
    }

    this.previousPosition = position;

  }
  
  handleStationaries(stationary: Stationary[]) {
     for (let i = 0; i < stationary.length; i++) {
         this.handleStationary(stationary[i]);
     }
  }

  handleStationary(stationary: Stationary) {
    const stationaryCircle = new google.maps.Circle({
      fillColor: 'pink',
      fillOpacity: 0.4,
      strokeOpacity: 0,
      map: this.map,
      center: new google.maps.LatLng(stationary.latitude, stationary.longitude),
      radius: stationary.radius
    });
    this.stationaryCircles.push(stationaryCircle);

    if (this.stationaryCircles.length > 10) {
      const removedCircle = this.stationaryCircles.shift();
      removedCircle.setMap(null);
    }

  }

  showMarker(position: Position) {
    if (this.marker != null) {
      this.marker.setMap(null);
    }

    const latLng = new google.maps.LatLng(position.latitude, position.longitude);
    this.marker = new google.maps.Marker({
      map: this.map,
      position: latLng
    });

    this.map.setCenter(latLng);
    this.map.setZoom(10);
  }

  loadMap() {
    let latLng = new google.maps.LatLng(39, 34);

    let mapOptions = {
      center: latLng,
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }
}

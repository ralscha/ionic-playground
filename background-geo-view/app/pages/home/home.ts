import {Component, OnInit} from "@angular/core";
import {NavController} from 'ionic-angular';
import {UUID} from 'angular2-uuid';
import {Observable} from 'rxjs/Observable';

declare var EventSource;

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit {
  private uuid: string;
  private map = null;
  private marker = null;

  constructor(private navController: NavController) {
    this.uuid = UUID.UUID();
  }

  ngOnInit() {
    this.loadMap();
    this.subscribeToServer();
  }

  subscribeToServer() {
    const observable = Observable.create(observer => {
      const eventSource = new EventSource("http://192.168.178.20:8888/subscribe/" + this.uuid);
      eventSource.addEventListener('pos', x => observer.next(JSON.parse(x.data)), false);
      eventSource.addEventListener('error', x => observer.error(x), false);

      return () => {
        eventSource.close();
      };
    });


    observable.subscribe({
      next: pos => this.showMarker(pos),
      error: err => console.error(err)
    });

  }

  showMarker(position:{latitude:number,longitude:number}) {
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

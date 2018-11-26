import 'rxjs/add/operator/map';

export class GoogleMapsProvider {

  mapElement: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyAZjJ216B4aJGdXTwXNevmXesob9RUSlPc";

  init(mapElement: any): Promise<any> {
    this.mapElement = mapElement;
    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        window['mapInit'] = () => {
          this.initMap().then(() => {
            resolve(true);
          });

        };

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);
      }
      else {
        this.initMap().then(() => {
          resolve(true);
        });
      }

    });

  }

  initMap(): Promise<any> {
    this.mapInitialised = true;
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);

      });

    });
  }


}

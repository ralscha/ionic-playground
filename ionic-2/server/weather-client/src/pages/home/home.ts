import { GeocodeProvider } from './../../providers/geocode-provider';
import { WeatherProvider } from './../../providers/weather-provider';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Slides, Content, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  locations: Array<Location>;
  @ViewChild('mySlides') slider: Slides;
  @ViewChild('weatherContent') weatherContent: Content

  public curClass: String;
  public weatherData: Array<any>;

  constructor(private weatherProvider: WeatherProvider,
    private geocodeProvider: GeocodeProvider,
    private nav: NavController,
    private alertCtrl: AlertController) {
    this.locations = this.getLocations();
    if (this.locations.length > 0) {
      this.weatherData = new Array(this.locations.length);
    }
    else {
      this.weatherData = [];
    }
  }

  ngOnInit(): any {
    if (this.locations.length) {
      this.locations.forEach((loc, idx) => {
        this.weatherProvider.load(loc.latitude, loc.longitude).subscribe(weatherRes => {
          this.weatherData[idx] = this.formatWeather(loc, weatherRes);
          //update the css for slide 0 only
          if (idx === 0) {
            this.curClass = 'weatherContent-' + this.weatherData[idx].icon;
          }
        });
      });
    }
  }

  /*
    A utility func that takes the raw data from the weather service and prepares it for
    use in the view.
    */
  formatWeather(loc: Location, data): any {
    let tempData: any = data.currently;
    tempData.name = loc.name;
    tempData.tomorrow = data.daily.data[1];
    tempData.tomorrow.summary = tempData.tomorrow.summary.toLowerCase().substr(0, tempData.tomorrow.summary.length - 1);
    return tempData;

  }

  addLocation(location: Location) {
    let currentLocations = this.getLocations();
    currentLocations.push(location);
    let index = currentLocations.length - 1;
    this.weatherProvider.load(location.latitude, location.longitude).subscribe(weatherRes => {
      this.weatherData[index] = this.formatWeather(location, weatherRes);
      if (index === 0) {
        this.curClass = 'weatherContent-' + this.weatherData[index].icon;
      }
    });

    this.locations = currentLocations;
    localStorage.setItem('locations', JSON.stringify(currentLocations));
  }

  getLocations() {
    const loc = localStorage.getItem('locations');
    if (loc) {
      return JSON.parse(loc);
    }
    return [];
  }

  onSlideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    var weatherClass = 'weatherContent-' + this.weatherData[currentIndex].icon;
    this.curClass = weatherClass;
  }

  doDelete() {
    this.locations = [];
    localStorage.removeItem('locations');
  }

  doAdd() {
    let alert = this.alertCtrl.create({
      title: 'Add Location',
      message: 'Enter the new location (name or zip).',
      inputs: [
        {
          name: 'location',
          placeholder: 'Location',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Add',
          handler: data => {
            if (data.location == '') {
              return true;
            }

            this.geocodeProvider.geocode(data.location).then(result => {
              this.addLocation(result);
              alert.dismiss();
            }, rejected => {
              alert.dismiss();
            });
            return false;
          }
        }
      ]
    });
    alert.present();
  }

}

interface Location {
  name: string,
  latitude: string,
  longitude: string
}

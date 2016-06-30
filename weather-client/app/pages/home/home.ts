import {Component, ViewChild, OnInit} from '@angular/core';
import {WeatherService} from '../../providers/weather-service/weather-service';
import {GeocodeService} from '../../providers/geocode-service/geocode-service';
import {Alert, NavController, Slides, Content} from 'ionic-angular';

@Component({
  providers: [WeatherService, GeocodeService],
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit {

  private weather: Object = { temperture: '' };
  private locations: Array<Location>;
  @ViewChild('mySlides') slider: Slides;
  @ViewChild('weatherContent') weatherContent: Content

  public curClass: String;
  public weatherData: Array<any>;

  constructor(private weatherService: WeatherService, private geocodeService: GeocodeService, private nav: NavController) {
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
        this.weatherService.load(loc.latitude, loc.longitude).subscribe(weatherRes => {
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
  formatWeather(loc:Location, data): any {
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
    this.weatherService.load(location.latitude, location.longitude).subscribe(weatherRes => {
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
    console.log('class is ' + weatherClass);
    this.curClass = weatherClass;
  }

  doAdd() {
    let prompt = Alert.create({
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
            this.geocodeService.geocode(data.location).then(result => {
              this.addLocation(result);
              this.nav.pop();
            }, rejected => {
              this.nav.pop();
            });
            return false;
          }
        }
      ]
    });
    this.nav.present(prompt);
  }

}

interface Location {
  name: string,
  latitude: string,
  longitude: string
}
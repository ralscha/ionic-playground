import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {Theme} from "../../models/theme";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public genders = [
    {value: 'F', display: 'Female'},
    {value: 'M', display: 'Male'}
  ];
  public roles = [
    {value: 'admin', display: 'Administrator'},
    {value: 'guest', display: 'Guest'},
    {value: 'custom', display: 'Custom'}
  ];
  public themes: Theme[] = [
    {backgroundColor: 'black', fontColor: 'white', display: 'Dark'},
    {backgroundColor: 'white', fontColor: 'black', display: 'Light'},
    {backgroundColor: 'grey', fontColor: 'white', display: 'Sleek'}
  ];
  public topics = [
    {value: 'game', display: 'Gaming'},
    {value: 'tech', display: 'Technology'},
    {value: 'life', display: 'Lifestyle'},
  ];
  public toggles = [
    {value: 'toggled', display: 'Toggled'},
    {value: 'untoggled', display: 'UnToggled'},
  ];

  public user: User;

  ngOnInit() {
    this.user = {
      name: '',
      gender: this.genders[0].value, // default to Female
      role: null,
      theme: this.themes[0], // default to dark theme
      isActive: false,
      toggle: this.toggles[1].value, // default to untoggled
      topics: [this.topics[1].value] // default to Technology
    }
  }

  public save(f: User, isValid: boolean) {
    console.log('isValid', isValid);
    console.log('user', f);
  }

}

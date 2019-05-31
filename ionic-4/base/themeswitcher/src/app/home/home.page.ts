import {Component} from '@angular/core';
import {ThemeSwitcherService} from '../theme-switcher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  constructor(private readonly themeSwitcher: ThemeSwitcherService) {
  }

  setDayTheme() {
    this.themeSwitcher.setTheme('day');
  }

  cycleTheme() {
    this.themeSwitcher.cycleTheme();
  }
}

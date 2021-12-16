import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Language} from './language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private static LNG_KEY = 'SELECTED_LANGUAGE';

  selected = '';

  constructor(private readonly translate: TranslateService) {
  }

  setInitialAppLanguage(): void {
    const language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language!);

    const val = localStorage.getItem(LanguageService.LNG_KEY);
    if (val) {
      this.setLanguage(val);
      this.selected = val;
    }
  }

  getLanguages(): Language[] {
    return [
      {text: 'English', value: 'en', img: 'assets/i18n/en.png'},
      {text: 'German', value: 'de', img: 'assets/i18n/de.png'},
    ];
  }

  setLanguage(lng: string): void {
    this.translate.use(lng);
    this.selected = lng;
    localStorage.setItem(LanguageService.LNG_KEY, lng);
  }
}

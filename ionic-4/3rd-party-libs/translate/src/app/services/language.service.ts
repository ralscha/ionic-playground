import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private static LNG_KEY = 'SELECTED_LANGUAGE';

  selected = '';

  constructor(private readonly translate: TranslateService) {
  }

  setInitialAppLanguage() {
    const language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);

    const val = localStorage.getItem(LanguageService.LNG_KEY);
    if (val) {
      this.setLanguage(val);
      this.selected = val;
    }
  }

  getLanguages() {
    return [
      {text: 'English', value: 'en', img: 'assets/i18n/en.png'},
      {text: 'German', value: 'de', img: 'assets/i18n/de.png'},
    ];
  }

  setLanguage(lng) {
    this.translate.use(lng);
    this.selected = lng;
    localStorage.setItem(LanguageService.LNG_KEY, lng);
  }
}

import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../services/language.service';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.page.html',
  styleUrls: ['./language-popover.page.scss'],
})
export class LanguagePopoverPage implements OnInit {

  languages = [];
  selected = '';

  constructor(private readonly languageService: LanguageService,
              private readonly popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }

  select(lng) {
    this.languageService.setLanguage(lng);
    this.popoverCtrl.dismiss();
  }

}

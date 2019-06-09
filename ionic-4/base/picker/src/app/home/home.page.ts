import {Component} from '@angular/core';
import {PickerController} from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  framework = '';
  selected = ['', '', ''];

  constructor(private readonly pickerCtrl: PickerController) {
  }

  async showBasicPicker() {
    const opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done'
        }
      ],
      columns: [
        {
          name: 'framework',
          options: [
            {text: 'Angular', value: 'A'},
            {text: 'Vue', value: 'B'},
            {text: 'React', value: 'C'}
          ]
        }
      ]
    };
    const picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      const col = await picker.getColumn('framework');
      this.framework = col.options[col.selectedIndex].text;
    });
  }

  async showAdvancedPicker() {
    const opts: PickerOptions = {
      cssClass: 'academy-picker',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
          cssClass: 'special-done'
        }
      ],
      columns: [
        {
          name: 'game',
          options: [
            {text: 'Dota', value: 'dota'},
            {text: 'WoW', value: 'wow'},
            {text: 'CS', value: 'cs'}
          ]
        },
        {
          name: 'category',
          options: [
            {text: 'MOBA', value: 'MOBA'},
            {text: 'MMORPG', value: 'MMORPG'}
          ]
        },
        {
          name: 'rating',
          options: [
            {text: 'Good', value: 1},
            {text: 'Very Good', value: 2},
            {text: 'Excellent', value: 3}
          ]
        }
      ]
    };
    const picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      const game = await picker.getColumn('game');
      const cat = await picker.getColumn('category');
      const rating = await picker.getColumn('rating');
      this.selected = [
        game.options[game.selectedIndex].text,
        cat.options[cat.selectedIndex].text,
        rating.options[rating.selectedIndex].text
      ];
    });
  }

}

import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from '@ionic/angular';
import {SortType} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  public readonly sortType = SortType.multi;

  rows = [
    {
      name: 'Ethel Price',
      gender: 'female',
      age: 22
    },
    {
      name: 'Claudine Neal',
      gender: 'female',
      age: 55
    },
    {
      name: 'Beryl Rice',
      gender: 'female',
      age: 67
    },
    {
      name: 'Simon Grimm',
      gender: 'male',
      age: 28
    }
  ];

  constructor(private readonly alertCtrl: AlertController) {
  }

  getRowClass(row) {
    return row.gender === 'male' ? 'male-row' : 'female-row';
  }

  async open(row) {
    const alert = await this.alertCtrl.create({
      header: 'Row',
      message: `${row.name} is ${row.age} years old!`,
      buttons: ['OK']
    });
    alert.present();
  }

  //
  // Summary Functions
  //
  genderSummary(values) {
    const male = values.filter(val => val === 'male').length;
    const female = values.filter(val => val === 'female').length;

    return `${male} / ${female}`;
  }

  ageSummary(values) {
    return values.reduce((a, b) => a + b, 0) / values.length;
  }
}

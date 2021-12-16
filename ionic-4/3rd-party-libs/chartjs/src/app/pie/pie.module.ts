import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PiePage} from './pie.page';
import {NgChartsModule} from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: PiePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgChartsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PiePage]
})
export class PiePageModule {
}

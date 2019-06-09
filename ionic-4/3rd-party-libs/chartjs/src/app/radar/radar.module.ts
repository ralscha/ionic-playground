import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {RadarPage} from './radar.page';
import {ChartsModule} from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: RadarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RadarPage]
})
export class RadarPageModule {
}

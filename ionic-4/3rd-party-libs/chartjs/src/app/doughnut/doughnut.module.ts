import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DoughnutPage} from './doughnut.page';
import {NgChartsModule} from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: DoughnutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgChartsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DoughnutPage]
})
export class DoughnutPageModule {
}

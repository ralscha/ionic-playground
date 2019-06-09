import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {BarPage} from './bar.page';
import {ChartsModule} from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: BarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BarPage]
})
export class BarPageModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HomePage} from './home.page';
import {DragulaModule} from 'ng2-dragula';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DragulaModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MenuPage} from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/main',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'main',
        loadChildren: () => import('../main/main.module').then(m => m.MainPageModule)
      },
      {
        path: 'ionic',
        loadChildren: () => import('../ionic/ionic.module').then(m => m.IonicPageModule)
      },
      {
        path: 'flutter',
        loadChildren: () => import('../flutter/flutter.module').then(m => m.FlutterPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {
}

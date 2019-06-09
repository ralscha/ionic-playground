import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'bar',
        loadChildren: () => import('../bar/bar.module').then(m => m.BarPageModule)

      },
      {
        path: 'doughnut',
        loadChildren: () => import('../doughnut/doughnut.module').then(m => m.DoughnutPageModule)
      },
      {
        path: 'radar',
        loadChildren: () => import('../radar/radar.module').then(m => m.RadarPageModule)
      },
      {
        path: 'pie',
        loadChildren: () => import('../pie/pie.module').then(m => m.PiePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/bar',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/bar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}

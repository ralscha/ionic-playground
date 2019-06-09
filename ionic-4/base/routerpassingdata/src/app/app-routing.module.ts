import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DataResolverService} from './resolver/data-resolver.service';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},
  {path: 'details', loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule)},
  {
    path: 'details/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

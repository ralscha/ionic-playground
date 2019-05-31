import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'notes/:id', loadChildren: () => import('./detail/detail.module').then(m => m.DetailPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

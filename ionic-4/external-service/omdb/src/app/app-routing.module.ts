import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'movies', pathMatch: 'full'},
  {path: 'movies', loadChildren: () => import('./pages/movies/movies.module').then(m => m.MoviesPageModule)},
  {path: 'movies/:id', loadChildren: () => import('./pages/movie-details/movie-details.module').then(m => m.MovieDetailsPageModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {Component} from '@angular/core';
import {MovieService, SearchType} from '../../services/movie.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage {

  results: Observable<any>;
  searchTerm = '';
  type: SearchType = SearchType.all;

  /**
   * Constructor of our first page
   * @param movieService The movie Service to get data
   */
  constructor(private readonly movieService: MovieService) {
  }

  searchChanged() {
    // Call our service function which returns an Observable
    this.results = this.movieService.searchData(this.searchTerm, this.type);
  }

}

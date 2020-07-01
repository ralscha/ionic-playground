import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url = 'https://www.omdbapi.com/';


  constructor(private readonly httpClient: HttpClient) {
  }

  /**
   * Get data from the OmdbApi
   * map the result to return only the results that we need
   *
   * @param title Search Term
   * @param type movie, series, episode or empty
   * @returns Observable with the search results
   */
  searchData(title: string, type: SearchType): Observable<any> {
    return this.httpClient.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${environment.omdbKey}`).pipe(
      map(results => (results as any).Search)
    );
  }

  /**
   * Get the detailed information for an ID using the "i" parameter
   *
   * @param id imdbID to retrieve information
   * @returns Observable with detailed information
   */
  getDetails(id) {
    return this.httpClient.get(`${this.url}?i=${id}&plot=full&apikey=${environment.omdbKey}`);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Pokemon} from '../pokemon';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  private readonly imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private readonly http: HttpClient) {
  }

  getPokemon(offset = 0) {
    return this.http
      .get<{results: Pokemon[]}>(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`)
      .pipe(
        map(result => result.results),
        map(pokemon => {
          return pokemon.map((poke, index) => {
            poke.image = this.getPokeImage(offset + index + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          });
        })
      );
  }

  findPokemon(search): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${search}`).pipe(
      map(pokemon => {
        pokemon.image = this.getPokeImage(pokemon.id);
        pokemon.pokeIndex = pokemon.id;
        return pokemon;
      })
    );
  }

  getPokeImage(index) {
    return `${this.imageUrl}${index}.png`;
  }

  getPokeDetails(index): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${index}`).pipe(
      map(poke => {
        const sprites = Object.keys(poke.sprites);
        poke.images = sprites
          .map(spriteKey => poke.sprites[spriteKey])
          .filter(img => img);
        return poke;
      })
    );
  }
}

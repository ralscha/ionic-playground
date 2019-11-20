import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from '@ionic/angular';
import {PokemonService} from '../services/pokemon.service';
import {Pokemon} from '../pokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements AfterViewInit {

  offset = 0;
  pokemon: Pokemon[] = [];
  searching = false;

  @ViewChild(IonInfiniteScroll)
  infinite: IonInfiniteScroll;

  constructor(private readonly pokeService: PokemonService) {
  }

  ngAfterViewInit() {
    this.loadPokemon();
  }

  loadPokemon(loadMore = false, event?) {
    if (loadMore) {
      this.offset += 25;
    }

    this.pokeService.getPokemon(this.offset).subscribe(res => {
      this.pokemon = [...this.pokemon, ...res];
      this.searching = false;
      if (event) {
        event.target.complete();
      }

      // Optional
      if (this.offset === 125) {
        this.infinite.disabled = true;
      }
    }, error => this.searching = false);
  }

  onSearchChange(e) {
    let value = e.detail.value;
    this.searching = true;

    if (value === '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    value = value.toLowerCase();
    this.pokeService.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
      this.searching = false;
    }, err => {
      this.pokemon = [];
      this.searching = false;
    });
  }

}

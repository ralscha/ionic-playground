import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../services/pokemon.service';
import {ActivatedRoute} from '@angular/router';
import {Pokemon} from '../pokemon';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  details: Pokemon;

  slideOpts = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    }
  };

  constructor(private readonly pokeService: PokemonService,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');
    this.pokeService.getPokeDetails(index).subscribe(details => {
      this.details = details;
    });
  }

}

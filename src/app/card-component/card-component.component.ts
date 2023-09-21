import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeapiService } from '../service/pokeapi.service';

import { PokemonDetail } from './../interfaces/pokemonDetail.interfaces';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css'],
})
export class CardComponentComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute)
  private pokemonService: PokeapiService = inject(PokeapiService)
  name: string | null = '';
  pokemon: PokemonDetail | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.name = params.get('name');
      this.pokemonService.getPokemonDetail(this.name as string).subscribe({
        next: data => this.pokemon = data,
        error: e => console.error(e)
      })
    });
  }
}

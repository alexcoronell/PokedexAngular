import { Component, OnInit } from '@angular/core';
import { PokemonDetail } from '../interfaces/pokemonDetail.interfaces';
import { PokeapiService } from '../service/pokeapi.service';
import { Pokemon } from '../interfaces/pokemon.interface';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

export interface Obja {
  name?: string;
  imagen?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Material UI
  displayedColumns: string[] = ['image', 'name', 'weight', 'height'];

  pokemons: Pokemon[] = [];
  dataSource: any[] = [this.pokemons];

  public offset: number = 20;
  public limit: number = 20;

  constructor(private pokemonService: PokeapiService) {}

  ngOnInit(): void {
    this.getPokemonsPage(this.offset, this.limit);
  }

  getPokemonsPage(offset: number, limit: number) {
    this.pokemonService.getPokemonList(offset, limit).subscribe({
      next: (data) => {
        data.map((poke) => {
          this.pokemonService.getPokemonDetail(poke.name).subscribe({
            next: (dataDetail) => {
              const pokemon: Pokemon = {
                name: dataDetail.name,
                image: dataDetail.sprites.front_default,
                weight: dataDetail.weight,
                height: dataDetail.height,
              };

              this.pokemons.push(pokemon);
              console.log(this.pokemons)
            },
            error: (error) => console.error(error),
          });
        });
      },
      error: (error) => console.error(error),
    });

    console.log(this.pokemons);
  }
}

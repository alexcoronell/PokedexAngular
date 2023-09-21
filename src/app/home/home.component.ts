import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../service/pokeapi.service';
import { Pokemon } from '../interfaces/pokemon.interface';

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

  offset: number = 0;
  limit: number = 20;

  constructor(private pokemonService: PokeapiService) {}

  ngOnInit(): void {
    this.getPokemonsPage(this.offset, this.limit);
  }

  getPokemonsPage(offset: number, limit: number) {
    this.pokemonService.getPokemonList(offset, limit).subscribe({
      next: data => {
        let pokemons: Pokemon[] = []
        const {results} = data as any;
        this.pokemons = results.map((item: any) => {
          this.pokemonService.getPokemonDetail(item.name).subscribe({
            next: (data) => {
              const pokemon: Pokemon = {
                name: data.name,
                image: data.sprites.front_default,
                weight: data.weight,
                height: data.height,
              };
              pokemons.push(pokemon)
              this.pokemons = [...pokemons, pokemon]
            }
          })
        })
      },
      error: e => console.error(e)
    })
  }
}

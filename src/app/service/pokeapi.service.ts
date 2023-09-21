import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PokemonDetail } from '../interfaces/pokemonDetail.interfaces';
import { Pokemon } from '../interfaces/pokemon.interface';
@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  private http: HttpClient = inject(HttpClient);

  private urlApi = 'https://pokeapi.co/api/v2/';

  getPokemonList(offset: number, limit: number) {
    return this.http.get<any>(this.urlApi + 'pokemon?offset=' + offset + '&limit=' + limit);
  }

  getPokemonDetail(pokemon: number | string) {
    return this.http.get<PokemonDetail>(this.urlApi + 'pokemon/' + pokemon);
  }
}

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

  constructor() {}

  getPokemonList(offset: number, limit: number): Observable<Pokemon[]> {
    return this.http
      .get<Pokemon[]>(
        this.urlApi + 'pokemon?offset=' + offset + '&limit=' + limit
      )
      .pipe(map((x: any) => x.results));
  }

  getPokemonDetail(pokemon: number | string) {
    return this.http.get<PokemonDetail>(this.urlApi + 'pokemon/' + pokemon);
  }
}

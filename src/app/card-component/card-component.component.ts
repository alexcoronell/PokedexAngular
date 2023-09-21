import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeapiService } from '../service/pokeapi.service';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css'],
})
export class CardComponentComponent implements OnInit {
  parametro: string | null | undefined;

  constructor(private route: ActivatedRoute, private pokemonService: PokeapiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.parametro = params.get('parametro');
      console.log('Parámetro recibido:', this.parametro);
    });
  }
}

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardComponentComponent } from './card-component/card-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: "full"},
  { path: 'pokemons', component: HomeComponent},
  { path: 'pokemons/:url', component: CardComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

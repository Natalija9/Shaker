import { CocktailService } from './../../services/cocktail.service';
import { Cocktail } from 'src/app/models/cocktail.model';
import { Component, Input, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})

export class FavouritesComponent implements OnInit {

  @Input() cocktails: Cocktail[];
  favouriteCocktails: Cocktail[];


  constructor(private cocktailService: CocktailService) {

    this.cocktails = [];
    this.favouriteCocktails = cocktailService.favouriteCocktails;
  }

   onClick(cocktailId: number): void {

    $('.ui.right.sidebar.menu').sidebar('hide');

    this.cocktails = [];
    this.cocktailService.getDetails(cocktailId).subscribe(x => this.cocktails.push(x));
    this.cocktailService.titleText = "One of your favourites";
   }

  ngOnInit(): void {

  }

}

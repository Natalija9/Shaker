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
    this.favouriteCocktails = [
      new Cocktail(12618, 'Orangeade', '', false, '', '', '', [], []),
      new Cocktail(11410, 'Gin Fizz', '', true, '', '', '', [], []),
      new Cocktail(12316, 'Strawberry Daiquiri', '', true, '', '', '', [], [])
    ];
  }

   onClick(cocktailId: number): void {

    $('.ui.right.sidebar.menu').sidebar('hide');

    this.cocktails = [];
    this.cocktailService.getDetails(cocktailId).subscribe(x => this.cocktails.push(x));
   }

  ngOnInit(): void {

  }

}

import { CocktailService } from './../../services/cocktail.service';
import { Cocktail } from 'src/app/models/cocktail.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

declare const $: any;

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})

export class FavouritesComponent implements OnInit {

  @Output() cocktailsEvent: EventEmitter<Cocktail[]> = new EventEmitter<Cocktail[]>();
  cocktails: Cocktail[];
  favouriteCocktails: Cocktail[];

  subs: Subscription[] = [];


  constructor(private cocktailService: CocktailService) {

    this.cocktails = [];
    this.favouriteCocktails = cocktailService.favouriteCocktails;
  }

   onClick(cocktailId: number): void {
    this.cocktails = [];
    let x = this.cocktailService.getDetails(cocktailId).subscribe(x => this.cocktails.push(x));
    this.subs.push(x);
    this.cocktailService.titleText = "One of your favourites";
    this.cocktailsEvent.emit(this.cocktails);
   }

  ngOnInit(): void {
    $('.dropdown').dropdown();
  }

  ngOnDestroy(): void {
    this.subs.forEach(subscription => subscription.unsubscribe());
  }

}

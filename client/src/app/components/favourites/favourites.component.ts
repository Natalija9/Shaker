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
  favouriteCocktails: Cocktail[] = [];

  subs: Subscription[] = [];

  constructor(private cocktailService: CocktailService) {

    this.cocktails = [];
    let x = cocktailService.getFavouriteCocktails().subscribe(data => {
      this.favouriteCocktails = data;
      this.cocktailService.favouriteCocktails = data;
    });
    this.subs.push(x);
  }

   onClick(cocktailId: number): void {
    this.cocktails = [];
    let x = this.cocktailService.getDetails(cocktailId).subscribe(x => this.cocktails.push(x));
    this.subs.push(x);
    this.cocktailService.titleText = "One of your favourites";
    this.cocktailsEvent.emit(this.cocktails);
   }

   refreshList() : void {
    let x = this.cocktailService.getFavouriteCocktails().subscribe(data => {
      this.favouriteCocktails = data;
      this.cocktailService.favouriteCocktails = data;
    });
    this.subs.push(x);

   }

  ngOnInit(): void {
    $('.dropdown').dropdown();
  }

  ngOnDestroy(): void {
    this.subs.forEach(subscription => subscription.unsubscribe());
  }

}

import { CocktailService } from 'src/app/services/cocktail.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail.model';

declare const $: any;

@Component({
  selector: 'app-drink-info',
  templateUrl: './drink-info.component.html',
  styleUrls: ['./drink-info.component.css']
})
export class DrinkInfoComponent implements OnInit {

  @Input() cocktail: Cocktail;

  cocktailDetails: Observable<Cocktail>;

  rating: Observable<number>;
  rated: boolean = false;
  public static stars: number = 0;
  alreadyRated: boolean = false;

  showDetails = false;
  showIngredient = false;
  ingredientDetails: Observable<String>;
  ingredientImg: String = "";

  inFavourites: boolean;

  constructor(private cocktailService: CocktailService) {
    this.cocktail = new Cocktail(0, "Mojito", " ", true, " ", "ovde su neke instrukcije kao", " ", [], [] );
    this.cocktailDetails = new Observable<Cocktail>();
    this.rating = this.cocktailService.getRating(this.cocktail.id);
    this.ingredientDetails = new Observable<String>();
    this.inFavourites = this.cocktailService.favouriteCocktails.findIndex(x => x.id == this.cocktail.id) !== -1;
  }

  onDetailsClicked(): void{
    this.rating = this.cocktailService.getRating(this.cocktail.id);
    this.showDetails = !this.showDetails;
    this.showIngredient = false;
    this.cocktailDetails =  this.cocktailService.getDetails(this.cocktail.id);


  }

  onIngredient(ingredientName: String): void{
    this.showIngredient = true;
    this.ingredientDetails = this.cocktailService.getIngredient(ingredientName);
    this.ingredientImg = "https://www.thecocktaildb.com/images/ingredients/" + ingredientName + ".png";
  }

  close(): void {
    this.showIngredient = false;
  }

  onStarsClicked(): void{
    if(this.rated && DrinkInfoComponent.stars !== 0){
      this.rating = this.cocktailService.addNewRating(DrinkInfoComponent.stars, this.cocktail.id);
      DrinkInfoComponent.stars = 0;
    }

  }

  checkRatingStatus(){
    let  ind = this.cocktailService.ratedCocktails.findIndex(x => x == this.cocktail.id) !== -1;
    if(ind){
      $('.rating:hover').rating('set rating', 0).rating('disable');
      this.alreadyRated = true;
    }
  }

  onHeartClicked(): void{
    if(this.inFavourites){
      this.cocktailService.removeFromFavourites(this.cocktail.id).subscribe();

    }
    else{
      this.cocktailService.addToFavourites(this.cocktail.id, this.cocktail.name).subscribe();
    }

    this.inFavourites = !this.inFavourites;
  }

  ngOnInit(): void {
    $('.ui.icon.button')
    .popup({
      popup : $('.custom.popup'),
      on    : 'click'
    });

    this.rating = this.cocktailService.getRating(this.cocktail.id);
    this.inFavourites = this.cocktailService.favouriteCocktails.findIndex(x => x.id == this.cocktail.id) !== -1;


    $('.ui.star.rating')
    .rating({
      initialRating: 0,
      maxRating: 5,
      onRate: function(value: number){
        $('.rating:hover').rating('disable');
        DrinkInfoComponent.stars = value;
       },
    })
  ;

  }
}

// constructor(
//   public id: number,
//   public name: string,
//   public category: string,
//   public alcoholic: boolean,
//   public glass: string,
//   public instructions: string,
//   public image: string,
//   public ingredients: string[],
//   public measures: string[]
// ) {}

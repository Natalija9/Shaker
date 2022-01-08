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

  showDetails = false;
  showIngredient = false;
  buttonText: string;
  ingredientDetails: Observable<String>;
  ingredientImg: String = "";

  constructor(private cocktailService: CocktailService) {
    this.cocktail = new Cocktail(0, "Mojito", " ", true, " ", "ovde su neke instrukcije kao", " ", [], [] );
    this.cocktailDetails = new Observable<Cocktail>();
    this.rating = this.cocktailService.getRating(this.cocktail.id);
    this.buttonText = "Details";
    this.ingredientDetails = new Observable<String>();
  }

  onClick(): void{
    this.rating = this.cocktailService.getRating(this.cocktail.id);
    this.showDetails = !this.showDetails;
    this.showIngredient = false;
    this.cocktailDetails =  this.cocktailService.getDetails(this.cocktail.id);
    if(this.showDetails)
      this.buttonText = "Show less";
    else
      this.buttonText = "Details";
  }

  onIngredient(ingredientName: String): void{
    this.showIngredient = true;
    this.ingredientDetails = this.cocktailService.getIngredient(ingredientName);
    this.ingredientImg = "https://www.thecocktaildb.com/images/ingredients/" + ingredientName + ".png";
    console.log(this.ingredientImg);
  }

  close(): void {
    this.showIngredient = false;
  }

  proba(){
    if(this.rated && DrinkInfoComponent.stars !== 0){
      console.log(this.cocktail.id);
      console.log(DrinkInfoComponent.stars);
      this.cocktailService.addNewRating(DrinkInfoComponent.stars, this.cocktail.id);
      this.rated = false;
      DrinkInfoComponent.stars = 0;
      this.cocktailService.getRating(this.cocktail.id);
    }

  }

  ngOnInit(): void {
    $('.ui.icon.button')
    .popup({
      popup : $('.custom.popup'),
      on    : 'click'
    });

    this.rating = this.cocktailService.getRating(this.cocktail.id);
    $('.ui.star.rating')
    .rating({
      initialRating: 0,
      maxRating: 5,
      onRate: function(value: number){
        console.log(value);
        $('.rating:hover').rating('disable');
        console.log(this);
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

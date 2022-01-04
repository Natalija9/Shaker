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

  ngOnInit(): void {
    $('.ui.icon.button')
    .popup({
      popup : $('.custom.popup'),
      on    : 'click'
    });

    $('.rating')
    .rating({
      initialRating: 2,
      maxRating: 5
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

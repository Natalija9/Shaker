import { Cocktail } from 'src/app/models/cocktail.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  public searchText: string;
  result: Observable<Cocktail[]>;
  favouriteCocktails: Cocktail[];

  titleText: string = "Recommended cocktails";


  constructor(private http: HttpClient) {
    this.searchText = "mojito";
    this.result = new Observable<Cocktail[]>();
    this.favouriteCocktails = [
      new Cocktail(12618, 'Orangeade', '', false, '', '', '', [], []),
      new Cocktail(11410, 'Gin Fizz', '', true, '', '', '', [], []),
      new Cocktail(12316, 'Strawberry Daiquiri', '', true, '', '', '', [], [])
    ];
  }

  getCocktails() : Observable<Cocktail[]> {
    return this.result = this.http.get<Cocktail[]>("http://localhost:5000/api/cocktails/search/" + this.searchText);
  }

  getRating(cocktailId: number) : Observable<number>{
    return this.http.get<number>("http://localhost:5000/api/ratings/" + String(cocktailId));
  }

  getDetails(cocktailId: number) : Observable<Cocktail> {
    return this.http.get<Cocktail>("http://localhost:5000/api/cocktails/cocktailId/" + String(cocktailId));
  }

  filterByCategory(category: String) : Observable<Cocktail[]> {
    return this.result = this.http.get<Cocktail[]>("http://localhost:5000/api/cocktails/category/" + category);
  }

  filterByGlass(glass: String) : Observable<Cocktail[]> {
    return this.result = this.http.get<Cocktail[]>("http://localhost:5000/api/cocktails/glass/" + glass);
  }

  filterByAlcoholic(alcohol: String) : Observable<Cocktail[]>{
    return this.result = this.http.get<Cocktail[]>("http://localhost:5000/api/cocktails/alcohol/" + alcohol);
  }

  getIngredient(name: String) : Observable<String> {
    return this.http.get<String>("http://localhost:5000/api/cocktails/ingredientName/" + name);
  }

  addNewRating(rating: number, cocktailId: number) : Observable<number>{
    return this.http.post<number>("http://localhost:5000/api/ratings", { "id": cocktailId, "rating" : rating, "username" : "b"}, {'headers': { 'content-type': 'application/json'}});
  }

  getRandomCocktail() : Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>("http://localhost:5000/api/cocktails/random");
  }

}



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
  favouriteCocktails: Cocktail[] = [];
  ratedCocktails: number[] = [11410, 12618];

  username: string = '';
  titleText: string = "Recommended cocktails";

  constructor(private http: HttpClient) {
    this.searchText = "mojito";
    this.result = new Observable<Cocktail[]>();
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
    this.ratedCocktails.push(cocktailId);
    return this.http.post<number>("http://localhost:5000/api/ratings", { "id": cocktailId, "rating" : rating, "username" : this.username}, {'headers': { 'content-type': 'application/json'}});
  }

  getRandomCocktail() : Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>("http://localhost:5000/api/cocktails/random");
  }

  getFavouriteCocktails() : Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>("http://localhost:5000/api/favourites/" + this.username);
  }

  addToFavourites(cocktailId: number, cocktailName: string) : Observable<Cocktail[]> {
    return this.http.put<Cocktail[]>("http://localhost:5000/api/favourites", { "username": this.username, "cocktailId" : cocktailId, "cocktailName" : cocktailName}, {'headers': { 'content-type': 'application/json'}});
  }

  removeFromFavourites(cocktailId: number) : Observable<Cocktail[]> {
    return this.http.put<Cocktail[]>("http://localhost:5000/api/favourites/" + this.username, { "username": this.username, "cocktailId" : cocktailId}, {'headers': { 'content-type': 'application/json'}});
  }

  getRatedCocktails() : void {
    this.http.get<number[]>("http://localhost:5000/api/ratings/rated/" + this.username).subscribe(data => this.ratedCocktails = data);
  }

}



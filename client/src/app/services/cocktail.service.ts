import { Cocktail } from 'src/app/models/cocktail.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  public searchText: string;
  result: Observable<Cocktail[]>;

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
}



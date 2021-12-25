import { Cocktail } from './../models/cocktail.model';
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
}



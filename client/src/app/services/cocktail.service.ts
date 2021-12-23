import { Injectable } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  public searchText: string;
  constructor(private http: HttpClient) {
    this.searchText = "mojito";
  }

  getCocktails() : Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>("http://localhost:5000/api/cocktails/cocktailName/" + this.searchText);
  }
}



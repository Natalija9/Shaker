import { Cocktail } from 'src/app/models/cocktail.model';
import { Component, OnInit } from '@angular/core';
import { CocktailService } from 'src/app/services/cocktail.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css']
})
export class DrinkListComponent implements OnInit {

  cocktails: Observable<Cocktail[]>;

  constructor(private cocktailService: CocktailService) {
    this.cocktails = this.cocktailService.getCocktails();
   }

  ngOnInit(): void {
  }

}

import { Cocktail } from 'src/app/models/cocktail.model';
import { Component, OnInit, Input } from '@angular/core';
import { CocktailService } from 'src/app/services/cocktail.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css']
})
export class DrinkListComponent implements OnInit {

  @Input() cocktails: Cocktail[];

  constructor(public cocktailService: CocktailService) {
    this.cocktails = [];
   }

  ngOnInit(): void {
  }

}

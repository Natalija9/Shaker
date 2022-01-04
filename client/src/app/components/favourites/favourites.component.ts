import { Cocktail } from 'src/app/models/cocktail.model';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})

export class FavouritesComponent implements OnInit {

  @Input() cocktails: Cocktail[];


  constructor() {

    this.cocktails = [];
   }

  ngOnInit(): void {

  }

}

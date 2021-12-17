import { Cocktail } from 'src/app/models/cocktail.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css']
})
export class DrinkListComponent implements OnInit {

  @Input() cocktails: Cocktail[] = [
    new Cocktail(
      2,
      'Margarita',
      'cocktail',
      true,
      'obicna',
      'nesto kao',
      '',
      ["prvi", "drugi"],
      7
    ),new Cocktail(
      2,
      'mai tai',
      'cocktail',
      true,
      'spec',
      'nesto kao',
      '',
      ["prvi", "nesto"],
      0
    ),new Cocktail(
      2,
      'blue lagoon',
      'cocktail',
      true,
      'obicna',
      'nesto kao',
      '',
      ["vodka", "drugi"],
      2
    ),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

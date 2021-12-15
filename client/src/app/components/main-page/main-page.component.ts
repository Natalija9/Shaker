import { Component, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail.model';

declare const $: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  drinksList: Cocktail[] = [
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
    $('.ui.sidebar')
    .sidebar({
      context: '.bottom.segment'
    })
    .sidebar('attach events', '.menu', '.item')
    .sidebar('hide')
    ;
  }
}

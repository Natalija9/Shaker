import { Component, OnInit, Input } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail.model';


@Component({
  selector: 'app-drink-info',
  templateUrl: './drink-info.component.html',
  styleUrls: ['./drink-info.component.css']
})
export class DrinkInfoComponent implements OnInit {

  @Input() cocktail: Cocktail;

  constructor() {
    this.cocktail = new Cocktail(1, "Mojito", " ", true, " ", "ovde su neke instrukcije kao", " ", [" "], 5 );
  }

  ngOnInit(): void {
  }

}


// constructor(
//   public id: number,
//   public name: string,
//   public category: string,
//   public alcoholic: boolean,
//   public glass: string,
//   public instructions: string,
//   public image: string,
//   public ingredients: [string],
//   public rating: number
// ) {}

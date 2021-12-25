import { CocktailService } from 'src/app/services/cocktail.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail.model';


@Component({
  selector: 'app-drink-info',
  templateUrl: './drink-info.component.html',
  styleUrls: ['./drink-info.component.css']
})
export class DrinkInfoComponent implements OnInit {

  @Input() cocktail: Cocktail;

  rating: Observable<number>;
  showDetails = false;

  constructor(private cocktailService: CocktailService) {
    this.cocktail = new Cocktail(0, "Mojito", " ", true, " ", "ovde su neke instrukcije kao", " ", [" "] );
    this.rating = this.cocktailService.getRating(this.cocktail.id);
  }

  onClick(): void{
    this.rating = this.cocktailService.getRating(this.cocktail.id);
    this.showDetails = true;
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

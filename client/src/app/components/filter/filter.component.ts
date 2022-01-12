import { Subscription } from 'rxjs';
import { CocktailService } from 'src/app/services/cocktail.service';
import { Cocktail } from 'src/app/models/cocktail.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {

  @Input() cocktails: Cocktail[];

  alcoholicCocktails: Cocktail[] = [];
  categoryCocktails: Cocktail[] = [];
  glassCocktails: Cocktail[] = [];

  subs: Subscription[] = [];

  public disabled:boolean=false;
  filterForm: FormGroup;
  categories: String[] = [
    "Ordinary_Drink", "Cocktail", "Milk Float Shake", "Cocoa", "Shot",
    "Coffee Tea", "Homemade_Liqueur", "Punch Party_Drink", "Beer", "Soft_Drink Soda"
  ];

  glasses: String[] = [
    "Cocktail glass", "Highball glass", "Old-fashioned glass", "Whiskey Glass", "Collins glass",
    "Champagne flute", "Whiskey sour glass", "Cordial glass", "Brandy snifter", "White wine glass",
    "Shot glass", "Punch bowl", "Pitcher", "Beer glass", "Martini glass", "Margarita glass", "Wine glass"
  ];


  get categoriesFormArray(): FormArray {
    return this.filterForm.get("categoriesForm") as FormArray;
  }

  get glassesFormArray(): FormArray {
    return this.filterForm.get("glassesForm") as FormArray;
  }

  constructor(private service: CocktailService) {

    this.disabled = !this.service.isAdult;
    this.cocktails = [];
    this.filterForm = new FormGroup({
      alcoholic: new FormControl(this.service.isAdult ? 'both' : 'nonAlcoholic', []),
      categoriesForm: new FormArray([]),
      glassesForm: new FormArray([])
    });
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.categories.forEach(() => this.categoriesFormArray.push(new FormControl(false)));
    this.glasses.forEach(() => this.glassesFormArray.push(new FormControl(false)));
  }

  onFilter(): void {
    const data = this.filterForm.value;
    const selectedCategories = data.categoriesForm;
    const selectedGlasses = data.glassesForm;

    this.alcoholicCocktails = [];
    this.categoryCocktails = [];
    this.glassCocktails = [];

    if(data.alcoholic==="nonAlcoholic"){
      let x =this.service.filterByAlcoholic("Non alcoholic").subscribe(cocktails => {
        this.alcoholicCocktails = cocktails;
        })

      this.subs.push(x)
    }
    else if(data.alcoholic==="alcoholic"){
      let x = this.service.filterByAlcoholic("Alcoholic").subscribe(cocktails => {
        this.alcoholicCocktails = cocktails;
        })
      this.subs.push(x);

      x = this.service.filterByAlcoholic("Optional alcohol").subscribe(cocktails => {
        this.alcoholicCocktails = this.alcoholicCocktails.concat(cocktails);
        })
      this.subs.push(x);

    }
    else{
      let x = this.service.filterByAlcoholic("Alcoholic").subscribe(cocktails => {
        this.alcoholicCocktails = cocktails;
        })
      this.subs.push(x);

      x = this.service.filterByAlcoholic("Non alcoholic").subscribe(cocktails => {
        this.alcoholicCocktails = this.alcoholicCocktails.concat(cocktails);
        })
      this.subs.push(x);

      x = this.service.filterByAlcoholic("Optional alcohol").subscribe(cocktails => {
        this.alcoholicCocktails = this.alcoholicCocktails.concat(cocktails);
        })
      this.subs.push(x);
    }

    for(let i = 0; i < this.categories.length; i++){
      if(selectedCategories[i]){
        let x = this.service.filterByCategory(this.categories[i]).subscribe(cocktails => {
          this.categoryCocktails = this.categoryCocktails.concat(cocktails);
          })
        this.subs.push(x);
        }
    }

    for(let i = 0; i < this.glasses.length; i++){
      if(selectedGlasses[i]){
        let x = this.service.filterByGlass(this.glasses[i]).subscribe(cocktails => {
          this.glassCocktails = this.glassCocktails.concat(cocktails);
          })
        this.subs.push(x);
      }
    }


    setTimeout(() => {

      this.service.titleText = "";
      this.cocktails = [];
      let result = [];

      if(this.categoryCocktails.length === 0 && this.glassCocktails.length === 0){
          result = this.alcoholicCocktails;
      }
      else if(data.alcoholic === "both"){
        if(this.categoryCocktails.length > 0 && this.glassCocktails.length > 0)
          result = this.categoryCocktails.filter((c: Cocktail) => this.glassCocktails.findIndex(x => x.id == c.id) !== -1);
        else{
          result = this.categoryCocktails.length > 0 ? this.categoryCocktails : this.glassCocktails;
        }
      }
      else{
        result = this.alcoholicCocktails;
        if(this.categoryCocktails.length > 0)
          result = result.filter((c: Cocktail) => this.categoryCocktails.findIndex(x => x.id == c.id) !== -1);

        if(this.glassCocktails.length > 0)
          result = result.filter((c: Cocktail) => this.glassCocktails.findIndex(x => x.id == c.id) !== -1);
        }

      this.cocktails = result.filter((v, i, a) => a.indexOf(v) === i);
      this.service.titleText = this.cocktails.length > 0 ? "Filter results" : "There are no results! Try other filters!";

    }, 1000);

    this.filterForm.reset({alcoholic : this.service.isAdult ? "both" : "nonAlcoholic"});
  }

  ngOnInit(): void {
    $('.ui.radio.checkbox').checkbox();
  }

  ngOnDestroy(): void {
    this.subs.forEach(subscription => subscription.unsubscribe());
  }

}

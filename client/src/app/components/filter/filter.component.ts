import { CocktailService } from 'src/app/services/cocktail.service';
import { Cocktail } from 'src/app/models/cocktail.model';
import { Component, OnInit, Input } from '@angular/core';
import { distinct } from 'rxjs/operators';
import { from, range } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, FormArray } from '@angular/forms';

declare const $: any;


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() cocktails: Cocktail[];

  alcoholicCocktails: Cocktail[] = [];
  categoryCocktails: Cocktail[] = [];
  glassCocktails: Cocktail[] = [];

  filterForm: FormGroup;
  categories: String[] = ["Ordinary_Drink", "Cocktail", "Milk Float Shake", "Cocoa", "Shot",
    "Coffee Tea", "Homemade_Liqueur", "Punch Party_Drink", "Beer", "Soft_Drink Soda"];
  glasses: String[] = ["Cocktail glass", "Highball glass", "Old-fashioned glass", "Whiskey Glass", "Collins glass",
   "Champagne flute", "Whiskey sour glass", "Cordial glass", "Brandy snifter", "White wine glass",
   "Shot glass", "Punch bowl", "Pitcher", "Beer glass", "Martini glass", "Margarita glass", "Wine glass"];
  alcoholic: String[]=["Alcoholic","Non alcoholic", "Optional alcoholic"];


  get categoriesFormArray(): FormArray {
    return this.filterForm.get("categoriesForm") as FormArray;
  }

  get glassesFormArray(): FormArray {
    return this.filterForm.get("glassesForm") as FormArray;
  }



  constructor(private service: CocktailService) {
    this.cocktails = [];
    this.filterForm = new FormGroup({
      alcoholic: new FormControl('both', []),
      categoriesForm: new FormArray([]),
      glassesForm: new FormArray([])
    });
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.categories.forEach(() => this.categoriesFormArray.push(new FormControl(false)));
    this.glasses.forEach(() => this.glassesFormArray.push(new FormControl(false)));
  }


  ngOnInit(): void {
    $('.ui.radio.checkbox').checkbox();
  }

  onFilter(): void {
    const data = this.filterForm.value;
    const selectedCategories = data.categoriesForm;
    const selectedGlasses = data.glassesForm;

    this.cocktails = [];

    if(data.alcoholic==="nonAlcoholic"){
      this.service.filterByAlcoholic("Non_alcoholic").subscribe(cocktails => {
        this.alcoholicCocktails = cocktails;
        })
    }
    else if(data.alcoholic==="alcoholic"){
      this.service.filterByAlcoholic("Alcoholic").subscribe(cocktails => {
        this.alcoholicCocktails = cocktails;
        })
      this.service.filterByAlcoholic("Optional alcohol").subscribe(cocktails => {
        this.alcoholicCocktails = this.alcoholicCocktails.concat(cocktails);
        })

    }

    for(let i = 0; i < this.categories.length; i++){
      if(selectedCategories[i]){
        this.service.filterByCategory(this.categories[i]).subscribe(cocktails => {
          this.categoryCocktails = this.categoryCocktails.concat(cocktails);
          })
        }
    }

    for(let i = 0; i < this.glasses.length; i++){
      if(selectedGlasses[i]){
        this.service.filterByGlass(this.glasses[i]).subscribe(cocktails => {
          this.glassCocktails = this.glassCocktails.concat(cocktails);
          })
      }
    }


    setTimeout(() => {

      if(data.alcoholic === "both" && this.categoryCocktails.length > 0){
        this.alcoholicCocktails = this.categoryCocktails;
      }
      else if(data.alcoholic === "both"){
        this.alcoholicCocktails = this.glassCocktails;
      }
      else if(this.categoryCocktails.length > 0){
        this.alcoholicCocktails = this.alcoholicCocktails.filter((c: Cocktail) => this.categoryCocktails.findIndex(x => x.id == c.id) !== -1);
      }
      if(this.glassCocktails.length > 0){
        this.alcoholicCocktails = this.alcoholicCocktails.filter((c: Cocktail) => this.glassCocktails.findIndex(x => x.id == c.id) !== -1);
      }
      this.cocktails = this.alcoholicCocktails.filter((v, i, a) => a.indexOf(v) === i);

    }, 500);

    this.service.titleText = "Filter results";
    this.filterForm.reset({alcoholic: "both"});
  }

}

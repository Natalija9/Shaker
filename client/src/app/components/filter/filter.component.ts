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
    // console.log(data.alcoholic);

    const selectedCategories = data.categoriesForm;
    // console.log(selectedCategories);

    const selectedGlasses = data.glassesForm;
    // console.log(selectedGlasses);

    this.cocktails = [];


    for(let i = 0; i < this.categories.length; i++){
      if(selectedCategories[i]){
        this.service.filterByCategory(this.categories[i]).subscribe(cocktails => {
          from<any>(cocktails).pipe(distinct((c: any) => c['id']), ).subscribe(x => this.cocktails.push(x));
          })
      }
    }

    for(let i = 0; i < this.glasses.length; i++){
      if(selectedGlasses[i]){
        this.service.filterByGlass(this.glasses[i]).subscribe(cocktails => {
          from<any>(cocktails).pipe(distinct((c: any) => c['id']), ).subscribe(x => this.cocktails.push(x));
          })
      }
    }

    if(data.alcoholic==="nonAlcoholic"){
      this.service.filterByAlcoholic("Non_alcoholic").subscribe(cocktails => {
        from<any>(cocktails).pipe(distinct((c: any) => c['id']), ).subscribe(x => this.cocktails.push(x));
        })
    }
    else if(data.alcoholic==="alcoholic"){
      this.service.filterByAlcoholic("Alcoholic").subscribe(cocktails => {
        from<any>(cocktails).pipe(distinct((c: any) => c['id']), ).subscribe(x => this.cocktails.push(x));
        })
    }


    this.service.titleText = "Filter results";
    this.filterForm.reset({alcoholic: "both"});
  }

}

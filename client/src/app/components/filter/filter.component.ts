import { Cocktail } from 'src/app/models/cocktail.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, FormArray } from '@angular/forms';

declare const $: any;


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() cocktails: Cocktail[] | null;
  filterForm: FormGroup;
  categories: String[] = ["Ordinary_Drink", "Cocktail", "Milk / Float / Shake", "Cocoa", "Shot",
    "Coffee / Tea", "Homemade_Liqueur", "Punch / Party_Drink", "Beer", "Soft_Drink / Soda"];
  selectedCategories: String[];
  glasses: String[] = ["Cocktail glass", "Highball glass", "OldFashioned Glass"];

  get categoriesFormArray(): FormArray {
    return this.filterForm.get("categoriesForm") as FormArray;
  }

  get glassesFormArray(): FormArray {
    return this.filterForm.get("glassesForm") as FormArray;
  }


  constructor() {
    this.cocktails = [];
    this.filterForm = new FormGroup({
      alcoholic: new FormControl('both', []),
      categoriesForm: new FormArray([]),
      glassesForm: new FormArray([])
    });
    this.selectedCategories = [];
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
    console.log(data.alcoholic);

    // this.selectedCategories = this.findNutritionistForm.value.categories
    //     .map((checked, i) => checked ? this.categories[i] : null)
    //     .filter(v => v !== null);



    this.selectedCategories = data.categoriesForm;
    console.log(this.selectedCategories);

    const selectegGlasses = data.glassesForm;
    console.log(selectegGlasses);
  }

}

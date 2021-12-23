import { FavouritesComponent } from './../favourites/favourites.component';
import { DrinkListComponent } from './../drink-list/drink-list.component';
import { CocktailService } from 'src/app/services/cocktail.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail.model';
import { Observable } from 'rxjs';


declare const $: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  searchForm: FormGroup;
  cocktails: Observable<Cocktail[]>;

  constructor(private formBuilder: FormBuilder, private service: CocktailService) {
    this.searchForm = new FormGroup({
      search: new FormControl('', [])
    });

    this.cocktails = new Observable<Cocktail[]>();
  }

  onSubmit(event: any){
    if(event.keyCode == 13) {
      const data = this.searchForm.value;
      console.log(data.search);

      this.service.searchText = data.search;
      this.cocktails = this.service.getCocktails();
    }

  }

  ngOnInit(): void {

    $('.ui.right.sidebar.menu')
    .sidebar({
      context: '.bottom.right.attached.segment'
    })
    .sidebar('attach events', ".item.right.attached")
    .sidebar('hide')
    ;

    $('.ui.left.sidebar.menu')
    .sidebar({
      context: '.bottom.segment'
    })
    .sidebar('attach events', ".item.left.attached")
    .sidebar('hide')
    ;


  }

}

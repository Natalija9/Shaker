import { Globals } from './../../common/globals';
import { FavouritesComponent } from './../favourites/favourites.component';
import { DrinkListComponent } from './../drink-list/drink-list.component';
import { CocktailService } from 'src/app/services/cocktail.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail.model';
import { Observable, from, of } from 'rxjs';
import { distinct } from 'rxjs/operators';


declare const $: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  searchForm: FormGroup;
  cocktails: Cocktail[];

  constructor(private formBuilder: FormBuilder, private service: CocktailService) {
    this.searchForm = new FormGroup({
      search: new FormControl('', [])
    });

    this.cocktails = [];
    this.service.getRandomCocktail().subscribe(cocktails => {
      from<any>(cocktails).pipe(distinct((c: any) => c['id']), ).subscribe(x => this.cocktails.push(x));
    })


  }

  onSubmit(event: any){
    if(event.keyCode == 13) {
      const data = this.searchForm.value;

      this.cocktails = [];
      this.service.searchText = data.search;
      this.service.getCocktails().subscribe(cocktails => {
        from<any>(cocktails).pipe(distinct((c: any) => c['id']), ).subscribe(x => this.cocktails.push(x));
      })

      this.service.titleText = "Search results"
      this.searchForm.reset();

    }

  }

  logOut(): void {
    Globals.shouldDisplayLogin = true;
    Globals.shouldDisplayMainPage = false;
  }

  ngOnInit(): void {

    $('.ui.right.sidebar.menu')
    .sidebar({
      context: '.bottom.right.attached.segment'
    })
    .sidebar('attach events', ".item.right.attached")
    .sidebar('hide');

    $('.ui.left.sidebar.menu')
    .sidebar({
      context: '.bottom.segment'
    })
    .sidebar('attach events', ".item.left.attached")
    .sidebar('hide');

    $('.dropdown').dropdown();
  }

}

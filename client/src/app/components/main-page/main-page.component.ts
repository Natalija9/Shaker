import { Subscription } from 'rxjs';
import { Globals } from './../../common/globals';
import { CocktailService } from 'src/app/services/cocktail.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail.model';
import { AuthService } from 'src/app/services/auth.service';

declare const $: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  cocktails: Cocktail[];

  subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private service: CocktailService,
    private auth:AuthService) {
    this.searchForm = new FormGroup({
      search: new FormControl('', [])
    });

    this.cocktails = [];
    let x =this.service.getRandomCocktail().subscribe(cocktails => {
      this.cocktails = cocktails;
    })

    this.subs.push(x);
  }

  onSubmit(event: any){
    if(event.keyCode == 13) {
      const data = this.searchForm.value;
      
      this.cocktails = [];
      this.service.searchText = data.search;
      let x = this.service.getCocktails().subscribe(cocktails => {
        this.cocktails = cocktails;
      })
      this.subs.push(x);
      
      this.service.titleText = "";

      setTimeout(() => {
        if(this.cocktails.length > 0)
          this.service.titleText = "Search results";
        else
          this.service.titleText = "There are no results! You can search something else!";
      }, 500);
      this.searchForm.reset();
    }
  }

  showFavourite(data: Cocktail[]) {
    this.cocktails = data;
  }

  logOut(): void {

    this.auth.logout();

    Globals.shouldDisplayLogin = true;
    Globals.shouldDisplayMainPage = false;
  }

  ngOnInit(): void {
    $('.ui.left.sidebar.menu')
    .sidebar({
      context: '.bottom.segment'
    })
    .sidebar('attach events', ".item.left.attached")
    .sidebar('hide');

    $('.dropdown').dropdown();
  }

  ngOnDestroy(): void {
    this.subs.forEach(subscription => subscription.unsubscribe())
  }
}

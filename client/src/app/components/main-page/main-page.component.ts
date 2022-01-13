import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(private formBuilder: FormBuilder, public service: CocktailService,
    private auth:AuthService,
    private router:Router) {

      this.searchForm = new FormGroup({
        search: new FormControl('', [])
      });

      this.service.titleText = "Recommended cocktails";
      if(!this.service.isAdult){
        this.cocktails = [];

        const cocktails = this.service.nonAlcoholicList;
        this.cocktails.push(cocktails[this.randomInteger(0,cocktails.length)]);
        this.cocktails.push(cocktails[this.randomInteger(0,cocktails.length)]);
        this.cocktails.push(cocktails[this.randomInteger(0,cocktails.length)]);
      }
      else{
        this.cocktails = [];
        let x = this.service.getRandomCocktails().subscribe(cocktails => {
          this.cocktails = cocktails;
        })
        this.subs.push(x);
      }
    }

    private  randomInteger(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onSubmit(event: any){
      if(event.keyCode == 13) {
        const data = this.searchForm.value;
        this.service.searchText = data.search;

        let x = this.service.getCocktails().subscribe(cocktails => {

          this.cocktails = [];
          this.service.titleText = '';
          if(!this.service.isAdult){
            cocktails = cocktails.filter((c: Cocktail) => this.service.nonAlcoholicList.findIndex(x => x.id == c.id) !== -1);
          }
          this.cocktails = cocktails;
          this.service.titleText = this.cocktails.length > 0 ?  "Search results" : "There are no results! You can search something else!";

        })
        this.subs.push(x);

        this.searchForm.reset();
      }
    }

    showFavourite(data: Cocktail[]) {
      this.cocktails = data;
    }


    logOut(): void {
      this.auth.logout();
      this.router.navigateByUrl('');
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

import { Globals } from './common/globals';
import { Cocktail } from 'src/app/models/cocktail.model';
import { Component, OnInit } from '@angular/core';

declare const $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Shaker';



  shouldDisplayLogin() {
    return Globals.shouldDisplayLogin;
  }


  shouldDisplaySignUp() {
    return Globals.shouldDisplaySignUp;
  }

  shouldDisplayMainPage() {
    return Globals.shouldDisplayMainPage;
  }

  ngOnInit(): void {

  }
}

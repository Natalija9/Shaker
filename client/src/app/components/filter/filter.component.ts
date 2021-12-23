import { Cocktail } from 'src/app/models/cocktail.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

declare const $: any;


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() cocktails: Cocktail[] | null;


  constructor() {
    this.cocktails = [];
   }

  ngOnInit(): void {


  }

}

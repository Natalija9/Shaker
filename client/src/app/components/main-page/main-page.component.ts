import { Component, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail.model';

declare const $: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }

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

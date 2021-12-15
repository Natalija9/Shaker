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


  //     this.cocktail = new Cocktail(1, "Mojito", " ", true, " ", "ovde su neke instrukcije kao", " ", [" "], 5 );

  ngOnInit(): void {
//     $('.context.example .ui.sidebar')
//   .sidebar({
//     context: $('.context.example .bottom.segment')
//   })
//   .sidebar('attach events', '.context.example .menu .item')
// ;
//   }
  }
}

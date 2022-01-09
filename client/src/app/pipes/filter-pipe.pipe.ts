import { Pipe, PipeTransform } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(cocktails: Cocktail[]): number {
    console.log(cocktails);
    console.log(cocktails.length);
    if(cocktails.length === 0) {
      return -1;
    }

    return cocktails.map((cocktail: Cocktail) => cocktail.id)
                    .reduce((left: number, right: number) => left + right);
  }

}

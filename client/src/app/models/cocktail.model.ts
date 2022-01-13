export class Cocktail {
  constructor(
      public id: number,
      public name: string,
      public category: string,
      public alcoholic: boolean,
      public glass: string,
      public instructions: string,
      public image: string,
      public ingredients: string[],
      public measures: string[]
  ) {}

}


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
      //public rating: number
  ) {}

}


// let newDrink = {
//   "id" : drink["idDrink"],
//   "name" : drink["strDrink"],
//   "category" : drink["strCategory"],
//   "alcoholic" : drink["strAlcoholic"] == 'Alcoholic' ? true : false,
//   "glass" : drink["strGlass"],
//   "instructions" : drink["strInstructions"],
//   "image" : drink["strDrinkThumb"],
//   "ingredients" :  Object.fromEntries(ingredients)

// }

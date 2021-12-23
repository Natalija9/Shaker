const express=require('express');
const cocktailsController = require('../../contollers/cocktails');

const router = express.Router();

// router.get('/cocktailName/:cocktailName',cocktailsController.searchCocktailsByName);

router.get('/search/:value', cocktailsController.searchCocktails);

// router.get('/firstLetter/:firstLetter',cocktailsController.searchCocktailsByFirstLetter);
router.get('/ingredientName/:ingredientName',cocktailsController.searchIngredientByName);
router.get('/cocktailId/:cocktailId',cocktailsController.fullCocktailDetailsById);
router.get('/ingredientId/:ingredientId',cocktailsController.IngredientById);
// router.get('/ingredient/:ingredient',cocktailsController.searchCocktailsByIngredient);
router.get('/alcohol/:alcohol',cocktailsController.filterByAlcoholic);
router.get('/category/:category',cocktailsController.filterByCategory);
router.get('/glass/:glass',cocktailsController.filterByGlass);

module.exports=router;
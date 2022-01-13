const express=require('express');
const cocktailsController = require('../../contollers/cocktails');

const router = express.Router();

router.get('/search/:value', cocktailsController.searchCocktails);
router.get('/ingredientName/:ingredientName', cocktailsController.searchIngredientByName);
router.get('/cocktailId/:cocktailId', cocktailsController.fullCocktailDetailsById);
router.get('/alcohol/:alcohol', cocktailsController.filterByAlcoholic);
router.get('/category/:category', cocktailsController.filterByCategory);
router.get('/glass/:glass', cocktailsController.filterByGlass);
router.get('/random', cocktailsController.randomCocktail);

module.exports = router;
const ratingService = require('../services/ratings');
//const validator = require('validator');

const listAllRatings = async (req, res, next) => {
    try {
        const allRatings = await ratingService.listAllRatings();
        res.status(200).json(allRatings);
      } catch (error) {
        next(error);
      }
};

const getRating = async (req, res, next) => {
    const id = req.params.id;

    try {
        if (id == undefined) {
          const error = new Error('Id missing');
          error.status = 400;
          throw error;
        }
    
        const cocktail = await ratingService.getRating(id);
        if (cocktail == null) {
          res.status(404).json();
        } else {
          res.status(200).json(cocktail);
        }
      } catch (error) {
        next(error);
      }
};

const addNewRating = async (req, res, next) => {
    const { id, rating } = req.body;
  
    try {
      if (
        !id ||
        !rating ||
        rating < 1 ||
        rating > 5
      ) {
        const error = new Error('Invalid input');
        error.status = 400;
        throw error;
      }
  
      const cocktail = await ratingService.getCocktailById(id);
      if(!cocktail) {   // nema ga, treba ga doati u bazu
        const newRating = await ratingService.addNewRating(
            id, rating
        );
        res.status(201).json(newRating);
      }
      else {
        const updatedCocktail = await ratingService.updateRating(
          id, rating
        );

        res.status(200).json(updatedCocktail);
      }
      
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
      listAllRatings,
      getRating,
      addNewRating
  };

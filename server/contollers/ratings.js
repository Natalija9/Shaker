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
    const { id, rating, username } = req.body;
  
    try {
      if (
        !id ||
        !rating ||
        !username ||
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
            id, rating, username
        );
        res.status(201).json(newRating);
      }
      else {  // koktel vec postoji u bazi, proveravamo da li ga je korisnik vec ocenio
        const checkUser = await ratingService.checkUsername(id, username);
        if(!checkUser) {  
          const updatedCocktail = await ratingService.updateRating(
            id, rating, username
          );
          res.status(200).json(updatedCocktail);
        } 
        else {  // ne moze vise puta da se ocenjuje
          const error = new Error('Cocktail can\'t be rated twice.');
          error.status = 403;
          throw error;
        }

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

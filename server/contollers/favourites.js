const favouritesService = require('../services/favourites');


const getFavourites = async(req, res, next) => {
    const username = req.params.username;
  
    try {
      if (username === undefined) {
        const error = new Error('Username missing');
        error.status = 400;
        throw error;
      }
  
      const data = await favouritesService.getFavourites(username);
      if (data === null) {
        res.status(404).json();
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  };
  
  const addToFavourites = async(req, res, next) => {
    const {username, cocktailId, cocktailName } = req.body;
  
    try {
      if (!username || !cocktailId || !cocktailName ) {
        const error = new Error('Invalid input');
        error.status = 400;
        throw error;
      }
  
      let newFave = await favouritesService.addToFavourites(
        username,
        cocktailId,
        cocktailName
      );

      if(newFave === null){
        newFave = await favouritesService.createNewFavourites(
          username,
          cocktailId,
          cocktailName
        )
      }
  
      if (newFave) {
        res.status(200).json(newFave);
      } else {
        const error = new Error('Invalid username or id');
        error.status = 403;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };


  const removeFromFavourites = async(req, res, next) => {
    const {username, cocktailId} = req.body;
  
    try {
      if (username === undefined) {
        const error = new Error('Username missing');
        error.status = 400;
        throw error;
      }

      console.log("kontroler ", username, cocktailId);
  
      let data = await favouritesService.removeFromFavourites(username, cocktailId);

      console.log("servis ", data);
      if (data === null) {
        res.status(404).json();
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
      getFavourites,
      addToFavourites,
      removeFromFavourites
  }
  
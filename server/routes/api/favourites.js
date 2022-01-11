const express = require('express');
const favouritesController = require('../../contollers/favourites');

const router = express.Router();

router.get('/:username', favouritesController.getFavourites);
router.put('/:username', favouritesController.removeFromFavourites);
router.put('/', favouritesController.addToFavourites);


module.exports = router;


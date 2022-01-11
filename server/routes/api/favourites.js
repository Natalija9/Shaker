const express = require('express');
const usersController = require('../../contollers/favourites');

const router = express.Router();

router.get('/:username', usersController.getFavourites);
router.put('/', usersController.addToFavourites);

module.exports = router;


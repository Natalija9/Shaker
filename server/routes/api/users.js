const express = require('express');
const usersController = require('../../contollers/users');
const authentication = require('../../utils/authentication');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:username/favourites', usersController.getFavourites);

router.get('/:username', usersController.getUserByUsername);



router.post('/register', usersController.addNewUser);
router.post('/login', authentication.canAuthenticate, usersController.loginUser);
//router.put('/', usersController.changeUserPassword);
//router.delete('/:username', usersController.deleteUser);
router.put('/addToFavourites', usersController.addToFavourites);

module.exports = router;

const express = require('express');
const usersController = require('../../contollers/users');


const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:username/favourites', usersController.getFavourites);

router.get('/:username', usersController.getUserByUsername);



router.post('/', usersController.addNewUser);
router.put('/', usersController.changeUserPassword);
router.delete('/:username', usersController.deleteUser);

module.exports = router;

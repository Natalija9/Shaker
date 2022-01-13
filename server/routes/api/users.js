const express = require('express');
const usersController = require('../../contollers/users');
const authentication = require('../../utils/authentication');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:username', usersController.getUserByUsername);

router.post('/register', usersController.addNewUser);
router.post('/login', authentication.canAuthenticate, usersController.loginUser);

module.exports = router;

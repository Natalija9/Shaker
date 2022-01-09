const usersService = require('../services/users_with_passwords');
const validator = require('validator');

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await usersService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

const getUserByUsername = async (req, res, next) => {
  const username = req.params.username;

  try {
    const jwt = await usersService.getUserJWTByUsername(username);
    return res.status(201).json({
      token:jwt
    });
  } catch (err) {
    next(err);
  }
};


const addNewUser = async (req, res, next) => {
  const { username, password, age } = req.body;

  console.log('request Service: ');

  try {
    if (
      !username ||
      !password ||
      !validator.isAlphanumeric(username)
    ) {
      const error = new Error('Invalid input');
      error.status = 400;
      throw error;
    }

    console.log('Before user Service: ');

    const jwt = await usersService.registerNewUser(
      username,
      password,
      age
    );

    console.log('After user Service: ', jwt);

    return res.status(201).json({
      token: jwt
    });
  } catch (error) {
    next(error);
  }
};
/*
const changeUserPassword = async (req, res, next) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    if (!username || !oldPassword || !newPassword) {
      const error = new Error('Invalid input');
      error.status = 400;
      throw error;
    }

    const user = await usersService.getUserByUsername(username);

    if (!user) {
      const error = new Error('Invalid username or password');
      error.status = 404;
      throw error;
    }

    const updatedUser = await usersService.changeUserPassword(
      username,
      newPassword
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      const error = new Error('Invalid username or password');
      error.status = 403;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
*/
/*
const deleteUser = async (req, res, next) => {
  const username = req.params.username;

  try {
    if (!username) {
      const error = new Error('Username missing');
      error.status = 400;
      throw error;
    }

    const user = await usersService.getUserByUsername(username);
    if (!user) {
      const error = new Error('Invalid username');
      error.status = 404;
      throw error;
    }

    await usersService.deleteUser(username);
    res.status(200).json();
  } catch (error) {
    next(error);
  }
};
*/

const getFavourites = async(req, res, next) => {
  const username = req.params.username;

  try {
    if (username == undefined) {
      const error = new Error('Username missing');
      error.status = 400;
      throw error;
    }

    const user = await usersService.getFavourites(username);
    if (user == null) {
      res.status(404).json();
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

const addToFavourites = async(req, res, next) => {

  const {username, id } = req.body;

  try {
    if (!username || !id ) {
      const error = new Error('Invalid input');
      error.status = 400;
      throw error;
    }

    const user = await usersService.getUserByUsername(username);
    if (!user) {
      const error = new Error('Invalid username');
      error.status = 404;
      throw error;
    }

    const newFave = await usersService.addToFavourites(
      username,
      id
    );

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


module.exports = {
  getUserByUsername,
  getAllUsers,
  addNewUser,
  //changeUserPassword,
  //deleteUser,
  getFavourites,
  addToFavourites
};
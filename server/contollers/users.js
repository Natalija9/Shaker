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

const loginUser = async(req, res, next) => {
  const username = req.username;

  try {
    const jwt = await usersService.getUserJWTByUsername(username);
    return res.status(201).json({
      token: jwt,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUserByUsername,
  getAllUsers,
  addNewUser,
  loginUser
};
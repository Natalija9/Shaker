const mongoose = require('mongoose');
const User = require('../models/users');
const jwtUtil = require('../utils/jwt');

const getAllUsers = async () => {
  console.log('Zahtev primljen!');
  const users = await User.find({}).exec();
  console.log('Zahtev obradjen: ', users)
  return users;
};

const getUserByUsername = async (username) => {
  console.log('Zahtev primljen: ', username);

  const user = await User.findOne({ username: username }).exec();

  console.log('Zahtev obradjen: ', user)

  return user;
};

async function getUserJWTByUsername(username) {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error(`User with username ${username} does not exist!`);
  }
  return jwtUtil.generateJWT({
    username: user.username,
    password: user.password,
    age: user.age,
  });
}

async function registerNewUser(username, password, age) {
  const user=new User();
  user.username=username;
  await user.setPassword(password);
  user.age=age;

  console.log('Before save:', user)
  await user.save();

  console.log('After save:', user)

  return getUserJWTByUsername(username);
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  getUserJWTByUsername,
  registerNewUser,
};
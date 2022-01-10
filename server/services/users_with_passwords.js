const mongoose = require('mongoose');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwtUtil = require('../utils/jwt');

const hashPassword = async (password) => {
  const SALT_ROUNDS = 10;
  const salt=await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

const isValidPassword = async (password) => {
  return await bycript.compare(password,hashPassword(password));
}

const getAllUsers = async () => {
  console.log('Zahtev primljen!');
  const users = await User.find({}).exec();
  console.log('Zahtev obradjen: ', users)
  return users;
};



/*
const getUserById = async (id) => {
  const user = await User.findById(id).exec();
  return user;
};
*/

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
    //id: user.id,
    username: user.username,
    password: user.password,
    age: user.age,
  });
}

/*
const getUsersByStatus = async (status) => {
  const users = await User.find({ status: status }).exec();
  return users;
};
*/
/*
const registerNewUser = async (
  username,
  password,
  age) => {
  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    password: hashedPassword,
    age
  });

  await newUser.save();
  return getUserJWTByUsername(username);
};
*/

async function registerNewUser(username, password, age) {
  const hashedPassword = await hashPassword(password);
  console.log(username, hashPassword, age);

  const user = new User({ 
    _id: new mongoose.Types.ObjectId(), 
    username, 
    password: hashedPassword,
    age});

  console.log('Before save:', user)
  await user.save();

  console.log('After save:', user)

  return getUserJWTByUsername(username);
}

/*
const changeUserPassword = async (username, oldPassword, newPassword) => {
  const user = await User.findOne({ username: username }).exec();
  const passwordMatch = await bcrypt.compare(oldPassword, user.password);

  if (!passwordMatch) {
    return null;
  }

  const hashedPassword = await hashPassword(newPassword);

  const updatedUser = await User.findOneAndUpdate(
    { username: username },
    { $set: { password: hashedPassword } },
    { new: true }
  );

  return updatedUser;
};
*/
/*
const deleteUser = async (username) => {
  await User.findOneAndDelete({ username: username }).exec();
};
*/

module.exports = {
  getAllUsers,
  //getUserById,
  getUserByUsername,
  getUserJWTByUsername,
  //getUsersByStatus,
  registerNewUser,
  isValidPassword,
  //changeUserPassword,
  //deleteUser,
};
const mongoose = require('mongoose');
const User = require('../models/users');


const getAllUsers = async () => {
  const users = await User.find({}).exec();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findById(id).exec();
  return user;
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username: username }).exec();
  return user;
};

const addNewUser = async (
  username,
  password,
  age
) => {
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    password,
    age,
    favourites:[],
  });

  await newUser.save();
  return newUser;
};

const changeUserPassword = async (username, newPassword) => {
  const updatedUser = await User.findOneAndUpdate(
    { username: username },
    { $set: { password: newPassword } },
    { new: true }
  );

  return updatedUser;
};

const deleteUser = async (username) => {
  await User.findOneAndDelete({ username: username }).exec();
};

const getFavourites = async (username) => {
  const user = await User.findOne({ username: username }).exec();
  return user.favourites;
}

const addToFavourites = async (username, id) => {
  const newFave = await User.findOneAndUpdate(
    {username : username},
    {$push: {favourites: id}},
    {new: true}
  );

  return newFave;
};
  



module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  addNewUser,
  changeUserPassword,
  deleteUser,
  getFavourites,
  addToFavourites,
};

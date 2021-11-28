const mongoose = require('mongoose');
const User = require('../models/users');
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const SALT_ROUNDS = 10;
  return await bcrypt.hash(password, SALT_ROUNDS);
};

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

const getUsersByStatus = async (status) => {
  const users = await User.find({ status: status }).exec();
  return users;
};

const addNewUser = async (
  username,
  email,
  password,
  age,
  programmingSkills,
  status
) => {
  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    email,
    password: hashedPassword,
    age,
    programmingSkills,
    status,
  });

  await newUser.save();
  return newUser;
};

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

const deleteUser = async (username) => {
  await User.findOneAndDelete({ username: username }).exec();
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUsersByStatus,
  addNewUser,
  changeUserPassword,
  deleteUser,
};

/* eslint-disable no-underscore-dangle */
const User = require('../models/user.model');

async function createNewUser(user) {
  let newUser = await User.findOne({ email: user.email }) || null;
  if (newUser !== null) {
    return {
      msg: 'The user already exists',
    };
  }
  newUser = new User(user);
  await newUser.save();
  return newUser;
}

async function getUserById(id) {
  const user = await User.findById(id);
  if (!user) {
    return {
      msg: 'Not found',
    };
  }
  return user;
}

async function updateUser(id, user) {
  const newUser = await User.findByIdAndUpdate(id, user, { new: true });
  return newUser;
}

async function addNewPatientToUser(userId, patientId) {
  const updatedUser = await User
    .findByIdAndUpdate(userId, { $push: { patients: patientId } }, { new: true });
  console.log(updatedUser);
  return updatedUser;
}

async function getAllUsers() {
  const users = await User.find({}).sort({ date: -1 });
  return users;
}

module.exports = {
  updateUser,
  createNewUser,
  getUserById,
  getAllUsers,
  addNewPatientToUser,
};

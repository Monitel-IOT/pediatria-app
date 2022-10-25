/* eslint-disable no-underscore-dangle */
const User = require('../models/user.model');

async function createNewUser(user) {
  let newUser = await User.findOne({ email: user.email }) || null;
  /* if (newUser !== null) {
    return {
      msg: 'The user already exists',
    };
  } */
  newUser = new User({ ...user, state: 1 });
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

async function deleteLogicUser(id) {
  const newUser = await User.findByIdAndUpdate(
    id,
    { $set: { state: 0 } },
    { new: true },
  );
  console.log(newUser);
  return newUser;
}

async function updateUser(id, user) {
  const newUser = await User.findByIdAndUpdate(id, user, { new: true });
  return newUser;
}

async function addNewPatientToUser(userId, patientId) {
  const updatedUser = await User
    .findByIdAndUpdate(userId, { $push: { patients: patientId } }, { new: true });
  // console.log(updatedUser);
  return updatedUser;
}

async function getAllUsers() {
  const users = await User.find({}).sort({ date: -1 });
  return users;
}
/**
 * Function to return all patients by user id
 * @param {String} userId User Id
 * @returns List of patients
 */
async function getListPatientsByUserId(userId) {
  const user = await User.findById(userId).populate('patients');
  return user.patients;
}

async function getUserByFirebaseId(firebaseId) {
  const user = await User.findOne({ firebaseId });
  if (!user) {
    return {
      msg: 'Not found',
    };
  }
  return user;
}

module.exports = {
  updateUser,
  createNewUser,
  getUserById,
  getAllUsers,
  addNewPatientToUser,
  getListPatientsByUserId,
  deleteLogicUser,
  getUserByFirebaseId,
};

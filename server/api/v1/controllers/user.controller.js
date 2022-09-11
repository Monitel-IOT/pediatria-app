const { getAllUsers, createNewUser, getListPatientsByUserId } = require('../services/user.service');

const getAllUsersHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      data: users,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

const createNewUserHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await createNewUser(user);
    res.status(200).json({
      data: newUser,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to return all patients by user id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllPatientsByUserIdHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const patients = await getListPatientsByUserId(userId);
    res.status(200).json({
      data: patients,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUsersHandler,
  createNewUserHandler,
  getAllPatientsByUserIdHandler,
};

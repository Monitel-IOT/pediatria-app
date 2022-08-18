const { getAllUsers, createNewUser } = require('../services/user.service');

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

module.exports = {
  getAllUsersHandler,
  createNewUserHandler,
};

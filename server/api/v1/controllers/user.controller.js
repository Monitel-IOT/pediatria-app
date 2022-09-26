const firebaseAdmin = require('../../../config/firebase');
const {
  getAllUsers, createNewUser, getListPatientsByUserId, getUserById, updateUser, deleteLogicUser,
} = require('../services/user.service');

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
  const { email, name, password } = req.body;
  try {
    const newFirebaseUser = await firebaseAdmin.auth.createUser({
      email,
      password,
    });
    if (newFirebaseUser) {
      const newUser = await createNewUser({
        email,
        name,
        firebaseId: newFirebaseUser.uid,
      });

      res.status(200).json({
        data: {
          id: newUser.id,
          email: newUser.email,
          firebaseId: newUser.firebaseId,
        },
        success: 'Cuenta creada exitosamente, Por favor inicia sesión',
      });
    }
  } catch (error) {
    if (error.code) {
      res.status(400).json({ error: error.code });
    }
    next(error);
  }
};

/**
 * Controller to return a user by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getUserByIdHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const vaccinesAvailable = { vaccinesAvailable: ['BCG', 'Hepatitis B', 'AMA', 'INF 1 y 2', 'SPR', '1 P+PO+RO+N', '2 P+PO+RO+N', '3 P+PO', 'Refuerzo SPR'] };
    const newUser = await getUserById(userId);
    res.status(200).json({
      data: { newUser, ...vaccinesAvailable },
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to update a user by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateUserByIdHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = req.body;
    const newUser = await updateUser(userId, user);
    res.status(200).json({
      data: newUser,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to return a user by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteUserByIdHandler = async (req, res, next) => {
  console.log('aqui');
  try {
    const userId = req.params.id;
    console.log(userId);
    await deleteLogicUser(userId);
    res.status(200).json({ msg: 'User deleted' });
  } catch (error) {
    console.log({ error });
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
  getUserByIdHandler,
  getAllPatientsByUserIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
};

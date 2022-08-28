/* eslint-disable no-underscore-dangle */
const { getAllPatients, createNewPatient } = require('../services/patient.service');
const { addNewPatientToUser } = require('../services/user.service');

const getAllPatientHandler = async (req, res, next) => {
  try {
    const patients = await getAllPatients();
    res.status(200).json({
      data: patients,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
/* prueba */
const createNewPatientHandler = async (req, res, next) => {
  try {
    const patient = req.body;
    console.log(patient);
    const newPatient = await createNewPatient(patient);
    res.status(200).json({
      data: newPatient,
      status: 'OK',
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

const createPatientToUserHandler = async (req, res, next) => {
  try {
    const patient = req.body;
    const userId = req.params.id;

    const newPatient = await createNewPatient(patient);
    const updatedUser = await addNewPatientToUser(userId, newPatient._id);
    res.status(200).json({
      data: updatedUser,
      status: 'OK',
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

module.exports = {
  getAllPatientHandler,
  createNewPatientHandler,
  createPatientToUserHandler,
};

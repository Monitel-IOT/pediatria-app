const { getAllPatients, createNewPatient } = require('../services/patient.service');

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

const createNewPatientHandler = async (req, res, next) => {
  try {
    const patient = req.body;
    const newPatient = await createNewPatient(patient);
    res.status(200).json({
      data: newPatient,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPatientHandler,
  createNewPatientHandler,
};

const { allDiagnosis, createNewDiagnosis } = require('../services/diagnosis.service');

const getAllDiagnosisHandler = async (req, res, next) => {
  try {
    const { id } = req.user;

    const diagnoses = await allDiagnosis(id);
    res.status(200).json({
      data: diagnoses,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
const createDiagnosisToAppointmentHandler = async (req, res, next) => {
  try {
    const diagnosis = req.body;
    const appointmentId = req.params.id;

    const newDiagnosis = await createNewDiagnosis(appointmentId, diagnosis);
    res.status(200).json({
      data: newDiagnosis,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllDiagnosisHandler,
  createDiagnosisToAppointmentHandler,
};

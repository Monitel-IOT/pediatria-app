const { allProlongedDiagnosis, createNewProlongedDiagnosis } = require('../services/prolongedDiagnosis.service');

const getAllProlongedDiagnosisHandler = async (req, res, next) => {
  try {
    const prolongedDiagnoses = await allProlongedDiagnosis();
    res.status(200).json({
      data: prolongedDiagnoses,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
const createProlongedDiagnosisToAppointmentHandler = async (req, res, next) => {
  try {
    const prolongedDiagnosis = req.body;
    const appointmentId = req.params.id;

    const newProlonged = await createNewProlongedDiagnosis(appointmentId, prolongedDiagnosis);
    res.status(200).json({
      data: newProlonged,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllProlongedDiagnosisHandler,
  createProlongedDiagnosisToAppointmentHandler,
};

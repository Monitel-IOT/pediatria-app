const { allAuxiliaryExams, createNewAuxiliaryExam } = require('../services/auxiliaryExam.service');

const getAllAuxiliaryExamsHandler = async (req, res, next) => {
  try {
    const auxiliaryExams = await allAuxiliaryExams();
    res.status(200).json({
      data: auxiliaryExams,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
const createAuxiliaryExamToAppointmentHandler = async (req, res, next) => {
  try {
    const auxiliaryExam = req.body;
    const appointmentId = req.params.id;

    const newAuxiliaryExam = await createNewAuxiliaryExam(appointmentId, auxiliaryExam);
    res.status(200).json({
      data: newAuxiliaryExam,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllAuxiliaryExamsHandler,
  createAuxiliaryExamToAppointmentHandler,
};

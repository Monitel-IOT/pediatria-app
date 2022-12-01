const { allTreatments, createNewTreatment } = require('../services/treatment.service');

const getAllTreatmentHandler = async (req, res, next) => {
  try {
    const treatments = await allTreatments();
    res.status(200).json({
      data: treatments,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
const createTreatmentToAppointmentHandler = async (req, res, next) => {
  try {
    const treatment = req.body;
    const appointmentId = req.params.id;

    const newTreatment = await createNewTreatment(appointmentId, treatment);
    res.status(200).json({
      data: newTreatment,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllTreatmentHandler,
  createTreatmentToAppointmentHandler,
};

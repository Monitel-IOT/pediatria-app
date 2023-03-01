const { allTreatments, createNewTreatment } = require('../services/treatment.service');

const getAllTreatmentHandler = async (req, res, next) => {
  try {
    const { id } = req.user;

    const treatments = await allTreatments(id);
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
    const { id } = req.user;

    const newTreatment = await createNewTreatment(appointmentId, treatment, id);
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

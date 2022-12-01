const { allLongTreatment, createNewLongTreatment } = require('../services/longTreatment.service');

const getAllLongTreatmentHandler = async (req, res, next) => {
  try {
    const longTreatments = await allLongTreatment();
    res.status(200).json({
      data: longTreatments,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
const createLongTreatmentToAppointmentHandler = async (req, res, next) => {
  try {
    const longTreatment = req.body;
    const appointmentId = req.params.id;

    const newLongTreatment = await createNewLongTreatment(appointmentId, longTreatment);
    res.status(200).json({
      data: newLongTreatment,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllLongTreatmentHandler,
  createLongTreatmentToAppointmentHandler,
};

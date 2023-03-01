const Treatment = require('../models/treatment.model');
const { addNewTreatmentToAppointment } = require('./appointment.service');

async function allTreatments(userId) {
  const treatments = await Treatment.find({ userId }).sort({ date: -1 });
  return treatments;
}

async function createNewTreatment(appointmentId, nameTreatment, userId) {
  try {
    const newTreatment = new Treatment({ nameTreatment, userId });
    await newTreatment.save();
    await addNewTreatmentToAppointment(appointmentId, newTreatment.id);

    return newTreatment;
  } catch (error) {
    throw Error({ error });
  }
}
module.exports = {
  allTreatments,
  createNewTreatment,
};

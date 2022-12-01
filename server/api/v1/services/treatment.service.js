const Treatment = require('../models/treatment.model');
const { addNewTreatmentToAppointment } = require('./appointment.service');

async function allTreatments() {
  const treatments = await Treatment.find({}).sort({ date: -1 });
  return treatments;
}

async function createNewTreatment(appointmentId, treatment) {
  const newTreatment = new Treatment(treatment);
  await newTreatment.save();
  await addNewTreatmentToAppointment(appointmentId, newTreatment.id);

  return newTreatment;
}

module.exports = {
  allTreatments,
  createNewTreatment,
};

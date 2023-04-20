const Treatment = require('../models/treatment.model');
const { addNewTreatmentToAppointment } = require('./appointment.service');

async function allTreatments(userId) {
  const treatments = await Treatment.find({ userId }).sort({ date: -1 });
  return treatments;
}

async function createNewTreatment(appointmentId, name, userId) {
  try {
    const newTreatment = new Treatment({ name, userId });
    await newTreatment.save();
    await addNewTreatmentToAppointment(appointmentId, newTreatment.id);

    return newTreatment;
  } catch (error) {
    throw Error({ error });
  }
}

async function findTreatment(name, userId) {
  try {
    const treatment = await Treatment.findOne({ name, userId });
    return treatment;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = {
  allTreatments,
  createNewTreatment,
  findTreatment,
};

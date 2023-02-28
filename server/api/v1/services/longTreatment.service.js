const LongTreatment = require('../models/longTreatment.model');
const { addNewLongTreatmentToAppointment } = require('./appointment.service');

async function allLongTreatment() {
  const longTreatments = await LongTreatment.find({}).sort({ date: -1 });
  return longTreatments;
}

async function createNewLongTreatment(appointmentId, longTreatment) {
  try {
    const newLongTreatment = new LongTreatment(longTreatment);
    await newLongTreatment.save();
    await addNewLongTreatmentToAppointment(appointmentId, newLongTreatment.id);

    return newLongTreatment;
  } catch (error) {
    throw Error({ error });
  }
}

module.exports = {
  allLongTreatment,
  createNewLongTreatment,
};

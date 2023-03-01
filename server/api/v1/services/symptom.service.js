const Symptom = require('../models/symptom.model');
const { addNewSymptomToAppointment } = require('./appointment.service');

async function allSymptoms() {
  const diagnoses = await Symptom.find({}).sort({ date: -1 });
  return diagnoses;
}

async function createNewSymptom(appointmentId, symptomName, userId) {
  try {
    const newSymptom = new Symptom({ symptomName, userId });
    await newSymptom.save();
    await addNewSymptomToAppointment(appointmentId, newSymptom.id);

    return newSymptom;
  } catch (error) {
    throw Error({ error });
  }
}

module.exports = {
  allSymptoms,
  createNewSymptom,
};

const Symptom = require('../models/symptom.model');
const { addNewSymptomToAppointment } = require('./appointment.service');

async function allSymptoms(userId) {
  const diagnoses = await Symptom.find({ userId }).sort({ date: -1 });
  return diagnoses;
}

async function createNewSymptom(appointmentId, name, userId) {
  try {
    const newSymptom = new Symptom({ name, userId });
    await newSymptom.save();
    await addNewSymptomToAppointment(appointmentId, newSymptom.id);

    return newSymptom;
  } catch (error) {
    throw Error({ error });
  }
}

async function findSymptom(name, userId) {
  try {
    const symptom = await Symptom.findOne({ name, userId });
    return symptom;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = {
  allSymptoms,
  createNewSymptom,
  findSymptom,
};

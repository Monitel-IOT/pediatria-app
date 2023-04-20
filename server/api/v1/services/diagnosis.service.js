const Diagnosis = require('../models/diagnosis.model');
const { addNewDiagnosisToAppointment } = require('./appointment.service');

async function allDiagnosis(userId) {
  const diagnoses = await Diagnosis.find({ userId }).sort({ date: -1 });
  return diagnoses;
}

async function createNewDiagnosis(appointmentId, name, userId) {
  try {
    const newDiagnosis = new Diagnosis({ name, userId });
    await newDiagnosis.save();
    await addNewDiagnosisToAppointment(appointmentId, newDiagnosis.id);

    return newDiagnosis;
  } catch (error) {
    throw Error({ error });
  }
}

async function findDiagnosis(name, userId) {
  try {
    const diagnosis = await Diagnosis.findOne({ name, userId });
    return diagnosis;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = {
  allDiagnosis,
  createNewDiagnosis,
  findDiagnosis,
};

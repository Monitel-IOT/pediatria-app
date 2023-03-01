const Diagnosis = require('../models/diagnosis.model');
const { addNewDiagnosisToAppointment } = require('./appointment.service');

async function allDiagnosis(userId) {
  const diagnoses = await Diagnosis.find({ userId }).sort({ date: -1 });
  return diagnoses;
}

async function createNewDiagnosis(appointmentId, diagnosisName, userId) {
  try {
    const newDiagnosis = new Diagnosis({ diagnosisName, userId });
    await newDiagnosis.save();
    await addNewDiagnosisToAppointment(appointmentId, newDiagnosis.id);

    return newDiagnosis;
  } catch (error) {
    throw Error({ error });
  }
}

module.exports = {
  allDiagnosis,
  createNewDiagnosis,
};

const Diagnosis = require('../models/diagnosis.model');
const { addNewDiagnosisToAppointment } = require('./appointment.service');

async function allDiagnosis() {
  const diagnoses = await Diagnosis.find({}).sort({ date: -1 });
  return diagnoses;
}

async function createNewDiagnosis(appointmentId, diagnosis) {
  const newDiagnosis = new Diagnosis(diagnosis);
  await newDiagnosis.save();
  await addNewDiagnosisToAppointment(appointmentId, newDiagnosis.id);

  return newDiagnosis;
}

module.exports = {
  allDiagnosis,
  createNewDiagnosis,
};

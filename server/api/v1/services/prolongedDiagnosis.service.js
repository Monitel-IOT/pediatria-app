const ProlongedDiagnosis = require('../models/prolongedDiagnosis.model');
const { addNewProlongedDiagnosisToAppointment } = require('./appointment.service');

async function allProlongedDiagnosis() {
  const diagnoses = await ProlongedDiagnosis.find({}).sort({ date: -1 });
  return diagnoses;
}

async function createNewProlongedDiagnosis(appointmentId, prolongedDiagnosis) {
  const newProlongedDiagnosis = new ProlongedDiagnosis(prolongedDiagnosis);
  await newProlongedDiagnosis.save();
  await addNewProlongedDiagnosisToAppointment(appointmentId, newProlongedDiagnosis.id);

  return newProlongedDiagnosis;
}

module.exports = {
  allProlongedDiagnosis,
  createNewProlongedDiagnosis,
};

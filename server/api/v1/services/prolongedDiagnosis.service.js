const ProlongedDiagnosis = require('../models/prolongedDiagnosis.model');
const { addNewProlongedDiagnosisToAppointment } = require('./appointment.service');

async function allProlongedDiagnosis() {
  const diagnoses = await ProlongedDiagnosis.find({}).sort({ date: -1 });
  return diagnoses;
}

async function createNewProlongedDiagnosis(appointmentId, prolongedDiagnosis) {
  try {
    const newProlongedDiagnosis = new ProlongedDiagnosis(prolongedDiagnosis);
    await newProlongedDiagnosis.save();
    await addNewProlongedDiagnosisToAppointment(appointmentId, newProlongedDiagnosis.id);

    return newProlongedDiagnosis;
  } catch (error) {
    throw Error({ error });
  }
}

module.exports = {
  allProlongedDiagnosis,
  createNewProlongedDiagnosis,
};

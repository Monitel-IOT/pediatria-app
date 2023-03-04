const ProlongedDiagnosis = require('../models/prolongedDiagnosis.model');
const { addNewProlongedDiagnosisToPatient } = require('./patient.service');

async function allProlongedDiagnosis() {
  const diagnoses = await ProlongedDiagnosis.find({}).sort({ date: -1 });
  return diagnoses;
}

async function createNewProlongedDiagnosis(patientId, prolongedDiagnosis) {
  try {
    const newProlongedDiagnosis = new ProlongedDiagnosis(prolongedDiagnosis);
    await newProlongedDiagnosis.save();
    await addNewProlongedDiagnosisToPatient(patientId, newProlongedDiagnosis.id);

    return newProlongedDiagnosis;
  } catch (error) {
    throw Error({ error });
  }
}

module.exports = {
  allProlongedDiagnosis,
  createNewProlongedDiagnosis,
};

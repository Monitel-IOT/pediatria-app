const Patient = require('../models/patient.model');

async function createNewPatient(patient) {
  let newPatient = await Patient.findOne({ NumberHC: patient.NumberHC }) || null;
  console.log(newPatient);
  if (newPatient !== null) {
    throw new Error('The patient already exists');
  }
  newPatient = new Patient(patient);
  await newPatient.save();
  return newPatient;
}

async function getPatientById(id) {
  const patient = await Patient.findById(id);
  if (!patient) {
    return {
      msg: 'Not found',
    };
  }
  return patient;
}

async function updatePatient(id, patient) {
  console.log(id, patient);
  const newPatient = await Patient.findByIdAndUpdate(id, patient, { new: true });
  return newPatient;
}

async function getAllPatients() {
  const patients = await Patient.find({}).sort({ date: -1 });
  return patients;
}

module.exports = {
  updatePatient,
  createNewPatient,
  getPatientById,
  getAllPatients,
};

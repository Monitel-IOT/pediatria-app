const Patient = require('../models/patient.model');

async function createNewPatient(patient) {
  let newPatient = await Patient.findOne({ numberHC: patient.numberHC }) || null;
  if (newPatient !== null) {
    return {
      msg: 'The patient already exists',
    };
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
  const newPatient = await Patient.findByIdAndUpdate(id, patient, { new: true });
  return newPatient;
}

async function getAllPatients() {
  const patients = await Patient.find({}).sort({ date: -1 });
  return users;
}

module.exports = {
  updatePatient,
  createNewPatient,
  getPatientById,
  getAllPatients,
};

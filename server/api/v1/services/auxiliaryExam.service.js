const AuxiliaryExam = require('../models/auxiliaryExam.model');
const { addNewAuxiliaryExamToAppointment } = require('./appointment.service');

async function allAuxiliaryExams() {
  const auxiliaryExams = await AuxiliaryExam.find({}).sort({ date: -1 });
  return auxiliaryExams;
}

async function createNewAuxiliaryExam(appointmentId, auxiliaryExam) {
  const newAuxiliaryExam = new AuxiliaryExam(auxiliaryExam);
  await newAuxiliaryExam.save();
  await addNewAuxiliaryExamToAppointment(appointmentId, newAuxiliaryExam.id);

  return newAuxiliaryExam;
}

module.exports = {
  allAuxiliaryExams,
  createNewAuxiliaryExam,
};

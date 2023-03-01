const AuxiliaryExam = require('../models/auxiliaryExam.model');
const { addNewAuxiliaryExamToAppointment } = require('./appointment.service');

async function allAuxiliaryExams(userId) {
  const auxiliaryExams = await AuxiliaryExam.find({ userId }).sort({ date: -1 });
  return auxiliaryExams;
}

async function createNewAuxiliaryExam(appointmentId, nameAuxiliaryExam, userId) {
  try {
    const newAuxiliaryExam = new AuxiliaryExam({ nameAuxiliaryExam, userId });
    await newAuxiliaryExam.save();
    await addNewAuxiliaryExamToAppointment(appointmentId, newAuxiliaryExam.id);

    return newAuxiliaryExam;
  } catch (error) {
    throw Error({ error });
  }
}

module.exports = {
  allAuxiliaryExams,
  createNewAuxiliaryExam,
};

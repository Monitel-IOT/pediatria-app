const AuxiliaryExam = require('../models/auxiliaryExam.model');
const { addNewAuxiliaryExamToAppointment } = require('./appointment.service');

async function allAuxiliaryExams(userId) {
  const auxiliaryExams = await AuxiliaryExam.find({ userId }).sort({ date: -1 });
  return auxiliaryExams;
}

async function createNewAuxiliaryExam(appointmentId, name, userId) {
  try {
    const newAuxiliaryExam = new AuxiliaryExam({ name, userId });
    await newAuxiliaryExam.save();
    await addNewAuxiliaryExamToAppointment(appointmentId, newAuxiliaryExam.id);

    return newAuxiliaryExam;
  } catch (error) {
    throw Error({ error });
  }
}

async function findAuxiliaryExam(name, userId) {
  try {
    const auxiliaryExam = await AuxiliaryExam.findOne({ name, userId });
    return auxiliaryExam;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = {
  allAuxiliaryExams,
  createNewAuxiliaryExam,
  findAuxiliaryExam,
};

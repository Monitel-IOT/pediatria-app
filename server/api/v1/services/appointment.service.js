const Appointment = require('../models/appointment.model');
const { addNewAppointmentToPatient } = require('./patient.service');

async function createNewAppointment(patientId, appointment) {
  const newAppointment = new Appointment(appointment);
  await newAppointment.save();
  await addNewAppointmentToPatient(patientId, newAppointment.id);

  return newAppointment;
}

async function getAppointmentById(id) {
  const newAppointment = await Appointment.findById(id)
    .populate('auxiliaryExams')
    .populate('diagnoses')
    .populate('longTreatments')
    .populate('treatments')
    .populate('symptoms');
  if (!newAppointment) {
    return {
      msg: 'Not found',
    };
  }
  return newAppointment;
}

async function updateAppointment(id, appointment) {
  const newAppointment = await Appointment.findByIdAndUpdate(id, appointment, { new: true });
  return newAppointment;
}

async function deleteAppointment(id) {
  const appointmentToDelete = await Appointment.findByIdAndUpdate(
    id,
    { $set: { state: 0 } },
    { new: true },
  );
  return appointmentToDelete;
}

async function addNewAuxiliaryExamToAppointment(appointmentId, auxiliaryExamId) {
  const updatedAppointment = await Appointment
    .findByIdAndUpdate(appointmentId, {
      $push:
      { auxiliaryExams: auxiliaryExamId },
    }, { new: true });
  return updatedAppointment;
}

async function addNewDiagnosisToAppointment(appointmentId, diagnosisId) {
  const updatedAppointment = await Appointment
    .findByIdAndUpdate(appointmentId, {
      $push:
      { diagnoses: diagnosisId },
    }, { new: true });
  return updatedAppointment;
}

async function addNewLongTreatmentToAppointment(appointmentId, longTreatmentId) {
  const updatedAppointment = await Appointment
    .findByIdAndUpdate(appointmentId, {
      $push:
      { longTreatments: longTreatmentId },
    }, { new: true });
  return updatedAppointment;
}

async function addNewProlongedDiagnosisToAppointment(appointmentId, prolongedDiagnosisId) {
  const updatedAppointment = await Appointment
    .findByIdAndUpdate(appointmentId, {
      $push:
      { prolongedDiagnoses: prolongedDiagnosisId },
    }, { new: true });
  return updatedAppointment;
}

async function addNewTreatmentToAppointment(appointmentId, treatmentId) {
  const updatedAppointment = await Appointment
    .findByIdAndUpdate(appointmentId, {
      $push:
      { treatments: treatmentId },
    }, { new: true });
  return updatedAppointment;
}

async function addNewSymptomToAppointment(appointmentId, symptomId) {
  const updatedAppointment = await Appointment
    .findByIdAndUpdate(appointmentId, {
      $push:
      { symptoms: symptomId },
    }, { new: true });
  return updatedAppointment;
}

module.exports = {
  createNewAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,

  addNewAuxiliaryExamToAppointment,
  addNewDiagnosisToAppointment,
  addNewLongTreatmentToAppointment,
  addNewProlongedDiagnosisToAppointment,
  addNewTreatmentToAppointment,
  addNewSymptomToAppointment,
};

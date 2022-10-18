const Appointment = require('../models/appointment.model');
const { addNewAppointmentToPatient } = require('./patient.service');

async function createNewAppointment(patientId, appointment) {
  const newAppointment = new Appointment(appointment);
  await newAppointment.save();
  await addNewAppointmentToPatient(patientId, newAppointment.id);

  return newAppointment;
}

async function getAppointmentById(id) {
  const newAppointment = await Appointment.findById(id);
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

module.exports = {
  createNewAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};

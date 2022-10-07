const Appointment = require('../models/appointment.model');

async function createNewAppointment(appointment) {
  const newAppointment = new Appointment(appointment);
  await newAppointment.save();
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

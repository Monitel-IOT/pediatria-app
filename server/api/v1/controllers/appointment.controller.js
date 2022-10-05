const {
  createNewAppointment, getAppointmentById, updateAppointment, deleteAppointment,
} = require('../services/appointment.service');

const createNewAppointmentHandler = async (req, res, next) => {
  try {
    const appointment = req.body;
    const newAppointment = await createNewAppointment(appointment);
    res.status(200).json({
      data: newAppointment,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

const getAppointmentByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await getAppointmentById(id);
    res.status(200).json({
      data: appointment,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

const updateAppointmentHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = req.body;
    const newAppointment = await updateAppointment(id, appointment);
    res.status(200).json({
      data: newAppointment,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

const deleteAppointmentHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    await deleteAppointment(userId);
    res.status(200).json({ msg: 'Appointment deleted' });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

module.exports = {
  createNewAppointmentHandler,
  getAppointmentByIdHandler,
  updateAppointmentHandler,
  deleteAppointmentHandler,
};

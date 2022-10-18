const express = require('express');

const AppointmentRouter = express.Router();

const AppointmentController = require('../controllers/appointment.controller');

AppointmentRouter.post('/:id', AppointmentController.createNewAppointmentHandler);
AppointmentRouter.get('/:id', AppointmentController.getAppointmentByIdHandler);
AppointmentRouter.put('/:id', AppointmentController.updateAppointmentHandler);
AppointmentRouter.delete('/:id', AppointmentController.deleteAppointmentHandler);

module.exports = AppointmentRouter;

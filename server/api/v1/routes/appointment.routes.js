const express = require('express');

const AppointmentRouter = express.Router();

const AppointmentController = require('../controllers/appointment.controller');

AppointmentRouter.post('', AppointmentController.createNewAppointmentHandler);
AppointmentRouter.get('/:id', AppointmentController.getAppointmentByIdHandler);
AppointmentRouter.put('/:id', AppointmentController.updateAppointmentHandler);

module.exports = AppointmentRouter;

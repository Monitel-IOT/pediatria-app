const express = require('express');

const TreatmentRouter = express.Router();

const TreatmentController = require('../controllers/treatment.controller');

TreatmentRouter.post('/:id', TreatmentController.createTreatmentToAppointmentHandler);
TreatmentRouter.get('', TreatmentController.getAllTreatmentHandler);

module.exports = TreatmentRouter;

const express = require('express');

const LongTreatmentRouter = express.Router();

const LongTreatmentController = require('../controllers/longTreatment.controller');

LongTreatmentRouter.post('/:id', LongTreatmentController.createLongTreatmentToAppointmentHandler);
LongTreatmentRouter.get('', LongTreatmentController.getAllLongTreatmentHandler);

module.exports = LongTreatmentRouter;

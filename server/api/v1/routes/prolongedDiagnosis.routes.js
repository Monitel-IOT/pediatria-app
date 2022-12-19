const express = require('express');

const ProlongedDiagnosisRouter = express.Router();

const ProlongedDiagnosisController = require('../controllers/prolongedDiagnosis.controller');

ProlongedDiagnosisRouter.post('/:id', ProlongedDiagnosisController.createProlongedDiagnosisToAppointmentHandler);
ProlongedDiagnosisRouter.get('', ProlongedDiagnosisController.getAllProlongedDiagnosisHandler);

module.exports = ProlongedDiagnosisRouter;

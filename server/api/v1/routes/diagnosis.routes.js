const express = require('express');

const DiagnosisRouter = express.Router();

const DiagnosisController = require('../controllers/diagnosis.controller');

DiagnosisRouter.post('/:id', DiagnosisController.createDiagnosisToAppointmentHandler);
DiagnosisRouter.get('', DiagnosisController.getAllDiagnosisHandler);

module.exports = DiagnosisRouter;

const express = require('express');

const AuxiliaryExamRouter = express.Router();

const AuxiliaryExamController = require('../controllers/auxiliaryExam.controller');

AuxiliaryExamRouter.post('/:id', AuxiliaryExamController.createAuxiliaryExamToAppointmentHandler);
AuxiliaryExamRouter.get('', AuxiliaryExamController.getAllAuxiliaryExamsHandler);

module.exports = AuxiliaryExamRouter;

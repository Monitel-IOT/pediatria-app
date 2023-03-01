const express = require('express');

const SymptomRouter = express.Router();

const SymptomController = require('../controllers/symptom.controller');

SymptomRouter.get('', SymptomController.getAllSymptomsHandler);

module.exports = SymptomRouter;

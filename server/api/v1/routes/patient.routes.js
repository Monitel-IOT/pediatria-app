const express = require('express');
const patientController = require('../controllers/patient.controller');

const router = express.Router();

router.get('', patientController.getAllPatientHandler);
router.post('', patientController.createNewPatientHandler);

module.exports = router;

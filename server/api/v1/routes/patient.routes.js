const express = require('express');
const patientController = require('../controllers/patient.controller');

const router = express.Router();

router.get('', patientController.getAllPatientHandler);
router.post('/:id', patientController.createPatientToUserHandler);

module.exports = router;

const express = require('express');
const patientController = require('../controllers/patient.controller');

const router = express.Router();

router.get('', patientController.getAllPatientHandler);
router.post('/createPatientToUserHandler/:id', patientController.createPatientToUserHandler);
router.post('', patientController.createNewPatientHandler);

module.exports = router;

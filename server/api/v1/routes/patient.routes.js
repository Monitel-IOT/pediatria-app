const express = require('express');
const patientController = require('../controllers/patient.controller');

const router = express.Router();

router.get('', patientController.getAllPatientHandler);
router.post('/:id', patientController.createPatientToUserHandler);
router.get('/:id', patientController.getAppointmentByIdHandler);
router.put('/:id', patientController.updateAppointmentHandler); 

module.exports = router;

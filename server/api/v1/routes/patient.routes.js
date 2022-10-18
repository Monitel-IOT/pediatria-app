const express = require('express');
const patientController = require('../controllers/patient.controller');

const router = express.Router();

router.get('', patientController.getAllPatientHandler);
router.post('/:id', patientController.createPatientToUserHandler);
router.get('/:id', patientController.getPatientByIdHandler);
router.delete('/:id', patientController.deletePatientHandler);
router.get('/:id/appointments', patientController.getAllAppointmentsByPatientHandler);

module.exports = router;

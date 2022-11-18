const express = require('express');
const patientController = require('../controllers/patient.controller');

const router = express.Router();

router.get('', patientController.getAllPatientHandler);
router.get('/patients', patientController.getAllPatientsByUserIdHandler);
router.post('', patientController.createPatientToUserHandler);
router.get('/:id', patientController.getPatientByIdHandler);
router.delete('/:id', patientController.deletePatientHandler);
router.get('/:id/appointments', patientController.getAllAppointmentsByPatientHandler);
router.put('/:id', patientController.editPatientToUserHandler);

module.exports = router;

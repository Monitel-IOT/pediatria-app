const express = require('express');

const authenticate = require('../../middleware/authenticate');
const userRouter = require('./routes/user.routes');
const patientRouter = require('./routes/patient.routes');

const AppointmentRouter = require('./routes/appointment.routes');
const AuxiliaryExamRouter = require('./routes/auxiliaryExam.routes');
const DiagnosisRouter = require('./routes/diagnosis.routes');
const LongTreatmentRouter = require('./routes/longTreatment.routes');
const ProlongedDiagnosisRouter = require('./routes/prolongedDiagnosis.routes');
const TreatmentRouter = require('./routes/treatment.routes');
const SymptomRouter = require('./routes/symptom.routes');

const router = express.Router();
router.use('/user', userRouter);
router.use('/patient', authenticate, patientRouter);
router.use('/appointment', authenticate, AppointmentRouter);
router.use('/auxiliary-exam', authenticate, AuxiliaryExamRouter);
router.use('/diagnosis', authenticate, DiagnosisRouter);
router.use('/long-treatment', authenticate, LongTreatmentRouter);
router.use('/prolonged-diagnosis', authenticate, ProlongedDiagnosisRouter);
router.use('/treatment', authenticate, TreatmentRouter);
router.use('/symptom', authenticate, SymptomRouter);

module.exports = router;

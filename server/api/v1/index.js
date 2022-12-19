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

const router = express.Router();

router.use('/user', userRouter);
router.use('/patient', authenticate, patientRouter);

router.use('/appointment', AppointmentRouter);
router.use('/auxiliary-exam', AuxiliaryExamRouter);
router.use('/diagnosis', DiagnosisRouter);
router.use('/long-treatment', LongTreatmentRouter);
router.use('/prolonged-diagnosis', ProlongedDiagnosisRouter);
router.use('/treatment', TreatmentRouter);

module.exports = router;

const express = require('express');

const AppointmentRouter = require('./routes/appointment.routes');
const userRouter = require('./routes/user.routes');
const patientRouter = require('./routes/patient.routes');
const authenticate = require('../../middleware/authenticate');

const router = express.Router();

router.use('/appointment', AppointmentRouter);
router.use('/user', userRouter);
router.use('/patient', authenticate, patientRouter);
module.exports = router;

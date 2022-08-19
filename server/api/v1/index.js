const express = require('express');

const AppointmentRouter = require('./routes/appointment.routes');
const userRouter = require('./routes/user.routes');

const router = express.Router();

router.use('/appointment', AppointmentRouter);
router.use('/user', userRouter);

module.exports = router;

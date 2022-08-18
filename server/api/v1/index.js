const express = require('express');

const AtencionRouter = require('./routes/atencion.routes');
const userRouter = require('./routes/user.routes');

const router = express.Router();

router.use('/atencion', AtencionRouter);
router.use('/user', userRouter);

module.exports = router;

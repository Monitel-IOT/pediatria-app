const express = require('express');

const AtencionRouter = require('./routes/atencion.routes');

const router = express.Router();

router.use('/atencion', AtencionRouter);
module.exports = router;

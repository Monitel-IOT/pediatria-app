const express = require('express');

const NoteRouter = require('./routes/notes.routes');

const router = express.Router();

router.use('/notes', NoteRouter);

module.exports = router;

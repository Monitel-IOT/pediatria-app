const express = require('express');

const NoteRouter = express.Router();

const NoteController = require('../controllers/note.controller');

NoteRouter.get('', NoteController.getHolaMundo);

module.exports = NoteRouter;

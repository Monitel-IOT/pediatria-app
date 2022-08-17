const express = require('express');

const AtencionRouter = express.Router();

const AtencionController = require('../controllers/atencion.controller');

AtencionRouter.post('', AtencionController.createAtencion);

module.exports = AtencionRouter;

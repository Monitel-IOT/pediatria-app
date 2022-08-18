const Atencion = require('../models/atencion.model');

const createAtencion = (request, response, next) => {
  Atencion.create(request.body)
    .then((newAtencion) => {
      response.statusMessage = 'Atencion Created';
      response.status(200).json({ newAtencion });
    })
    .catch((err) => {
      next(err);
    });
};

const getAtencionById = (request, response, next) => {
  Atencion.findById(request.params.id)
    .then((atencion) => {
      response.statusMessage = 'Atencion enviada';
      response.status(200).json(atencion);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createAtencion,
  getAtencionById,
};

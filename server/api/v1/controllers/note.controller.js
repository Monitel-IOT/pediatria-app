const getHolaMundo = (request, response, next) => {
  response.send('hola mundo xdd');
};

const errorHandler = (request, response, next) => {
  throw new Error('My first Sentry error!');
};

module.exports = {
  getHolaMundo,
  errorHandler,
};

const getHolaMundo = (request, response) => {
  response.send('hola mundo');
};

module.exports = {
  getHolaMundo,
};

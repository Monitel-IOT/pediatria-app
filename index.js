const http = require('http');
const app = require('./server');
const { connect } = require('./server/config/database');
const config = require('./server/config');
const { connect: connectSocket, socket } = require('./server/config/socket');

const { database, port } = config;

console.log('proccess nev', process.env);
// console.log('Initial config', config);

connect({
  databaseName: database.name,
  url: database.url,
});

const server = http.createServer(app);

connectSocket(server);
const listen = server.listen(port, () => {
  // socket status
  socket.io.on('connection', (resSocket) => {
    console.log(`Socket connected: ${resSocket.id}`);
  });
  socket.io.on('disconnect', (resSocket) => {
    console.log(`Socket disconnected: ${resSocket.id}`);
  });

  console.log(`server running at ${port}`);
});

module.exports = { server, listen };

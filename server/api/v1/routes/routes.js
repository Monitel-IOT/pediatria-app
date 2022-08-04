// Routers
const NoteRouter = require('./notes.routes');

function routes(app) {
  // Routes
  app.use('/api/notes', NoteRouter);
}

module.exports = routes;

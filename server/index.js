const express = require('express');

const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const cors = require('cors');

const api = require('./api/v1');
const { requestId, requestLog } = require('./middleware/logger');

const notFound = require('./middleware/notFound');
const handlerErrors = require('./middleware/handleErrors');

const app = express();

// middlewares
app.use(requestId);
app.use(requestLog);
app.use(cors());

app.use(express.json());

// ///////////////// SENTRY ////////////////////////////////////////////////////////
Sentry.init({
  dsn: 'https://8bffeb9ac23947cf822d59b0c1203f64@o1361778.ingest.sentry.io/6653583',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Routes
app.use('/api/v1', api);

app.use(notFound);

app.use(Sentry.Handlers.errorHandler());

app.use(handlerErrors);

module.exports = app;

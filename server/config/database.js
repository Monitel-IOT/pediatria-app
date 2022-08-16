const mongoose = require('mongoose');
const { logger } = require('../middleware/logger');

const connect = ({ databaseName, url = '' }, options = {}) => {
  const dburl = `${url}/${databaseName}`;
  logger.info('Connected from MongoAtlas');

  mongoose.connect(dburl, {
    ...options,
  });

  mongoose.connection.on('connected', () => {
    logger.info('Database connected');
  });
  mongoose.connection.on('close', () => {
    logger.info('Database disconnected');
  });
  mongoose.connection.on('error', (error) => {
    logger.error(`Database error: ${error}`);
  });
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Database disconnected, because app termination');
      process.exit(0);
    });
  });
};

const disconnect = () => {
  mongoose.connection.close(() => {
    logger.info('Database disconnected successfully');
  });
};

module.exports = { connect, disconnect };

require('dotenv').config();

const getEnv = () => {
  let databaseUrl;
  console.log('NODE ENV', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    databaseUrl = process.env.DATABASE_DEV;
  }
  if (process.env.NODE_ENV === 'test') {
    databaseUrl = process.env.DATABASE_TEST;
  }
  if (process.env.NODE_ENV === 'production') {
    databaseUrl = process.env.DATABASE_PRODUCTION;
  }
  return databaseUrl;
};

const config = {
  currentEnviroment: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  jwtsecret: 'Your secret is here',
  database: {
    name: getEnv(),
    url: process.env.DATABASE_URL,
  },
};
module.exports = config;

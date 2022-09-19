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

const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCshyIzBpwVqA8I\nuvT6L2SQc3f+3GoVl1BfvzrChQKhLxzHFb+qNyyjVJH0IHI7jrJW42F3JGVcgmEY\nYmi6AzLog8DSESkVLnNqOgLpbEISBIUH4qi3F8/styvahIU0+mJYlOmcJsmPdFAf\nkOjCEFTKGx49j/UmRii1SYElqT8tnazFjSLqcZgbVijsG4+X44PsJH+7VFp7JiLc\n9sLur0YSGDyD6v8vs4cVtrXaXj3lxEH+GNYTsJGUoFOFUeOrP2rN0U/D8bsuIMmx\nUBKf8XeJfpR9+GyiGF1p80MyZRB7Aj9e6oFUAgIxsr4OYnbXz0SaxIMjsE1z+7zZ\nqIOyrTSZAgMBAAECggEABHVLe3EQyHh6xvl5yhs+aIMrVyEf9qXd1FOPM6aXPk4G\n2tgjh0T8uM2/JcVO3l4eGqOuiZMdsWnHE4e7eA8MGjkJWwRJgPwdzGFqYNjEzk1i\nmKURQgXyAAZtsixZeth7gRl7/eZ8r+HMDjzC3vzoC/7uZZ3aMl5+v8yB81SvxsBw\n5xyG0LGNiHKk6Tqaw5FV1rhbGr2T+O2sss9ExxUfMNttEqckJfOGbFqwNw6AiSju\nCSyN/EAn28I5WGhvP5dgTQnetCqYJ1630l1D2nqUdyzx7KHcxTwfu5vmdiLUf6Ua\nKfDuSWCWaPhL59VZZDVZbZ3g8TvFsgko70sLXudlvwKBgQDlGhT7GZz9QMuP+o7N\nGyuGUZZEsNmVUvhNumItBNk+uhs0DmJDflsdLf2XVjq5cu7AIIEtlubOK8NwqO1S\naGJa+WJq2UXf6w0irU1OWXCFynyyKqGveegxSyead6qRA1LyE7sNjY4IE7lxo92P\n6tZmKl9tYUudAQFUgbJdSOP/rwKBgQDAyKe1WYEz1XNW09fj8cgt9/JnntJWuqMK\n8+ABHN6t7pud81j+pTnSTb5S7w5XEv/0lcZYLAtHA0REpUAc2/ngEv17n7kvsZlB\nHf+PLd+oiwULIPUGToZXi513mEtLeFmLQ+pCX3PITJPPJ72hiBud0hPTAKQwl25b\nRlqTQr6aNwKBgQChwm2n8ai/w7029oFXXmS33OlNrNSkM0Xwk7X39WFygbLtaW6G\nGzQ4AR35eb/S6syaSRkMWGy0i3/eDtgqBFvVwhl0Od61QGAw6M4ZkNr7DEJJBgLN\nRDTmgRsAXJfI9eDd3YKICjeLimm4TCwHDpe84RQpxbW+sFQBF+YZKXsaLwKBgA+3\njCy1ylnOeiPHC5/S024j+8hE44McnjRDY6zTjLgDbv52m3fPQqKJog2i3bltnB51\no4EGvjig5IzwKATyTjHdenr8r51azlLHvlEO/WABTXz1x+QmvL8ga8sXSHQzsKEw\n/UVCAO+AhsBpzgUAUrgQK3uVXs1zWxTn7HR7CY0LAoGACFuKrPadAeECCFioWdVf\nSaZe6DGlsn6ENuEoGpnLDqvtaIWvz376wJzhrd7Q2PVL79QrrpQjivj/q2xpjuGW\n9RUN3cZ7x/dialrL02ZGMK++I4obo1c82XGs42Ncirrec6iQGMa1w38wbEqpapVr\n42dKnMVTsLAo/2L7FOP70tM=\n-----END PRIVATE KEY-----\n';

const config = {
  currentEnviroment: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  jwtsecret: 'Your secret is here',
  database: {
    name: getEnv(),
    url: process.env.DATABASE_URL,
  },
  firebase: {
    type: process.env.TYPE,
    projectId: process.env.PROJECT_ID,
    privateKeyId: process.env.PRIVATE_KEY_ID,
    privateKey: PRIVATE_KEY,
    clientEmail: process.env.CLIENT_EMAIL,
    clientId: process.env.CLIENT_ID,
    authUri: process.env.AUTH_URI,
    tokenUri: process.env.TOKEN_URI,
    authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.CLIENT_X509_CERT_URL,
  },
};
module.exports = config;

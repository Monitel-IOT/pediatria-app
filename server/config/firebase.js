const admin = require('firebase-admin');
const config = require('.');

const serviceAccount = {
  type: config.firebase.type,
  projectId: config.firebase.projectId,
  privateKeyId: config.firebase.privateKeyId,
  privateKey: config.firebase.privateKey,
  clientEmail: config.firebase.clientEmail,
  clientId: config.firebase.clientId,
  authUri: config.firebase.authUri,
  tokenUri: config.firebase.tokenUri,
  authProviderX509CertUrl: config.firebase.authProviderX509CertUrl,
  clientX509CertUrl: config.firebase.clientX509CertUrl,
};

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseAdmin = {
  auth: firebase.auth(),
};

module.exports = firebaseAdmin;

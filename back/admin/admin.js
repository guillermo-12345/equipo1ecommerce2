const admin = require('firebase-admin');
const serviceAccount = require('../credentials/firebase-key.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin inicializado correctamente');
} else {
  console.log('Firebase Admin ya estaba inicializado');
}

module.exports = admin;

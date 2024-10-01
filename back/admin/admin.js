// backend/admin.js
const admin = require('firebase-admin');
const serviceAccount = require('./ruta-al-archivo/equipo1-ecommerce-firebase-adminsdk-shdvj-444ab7c9db.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://equipo1-ecommerce.firebaseio.com"
});

module.exports = { admin };

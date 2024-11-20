const admin = require('firebase-admin');
const serviceAccount = require('../credentials/firebase-key.json');
const usuarioController = require('../controllers/usuarioController');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.header("authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.uid = decodedToken.uid;
    req.email = decodedToken.email; 
    await usuarioController.registerUserIfNotExists(req, res, next); 
  } catch (error) {
    console.error("Token no válido:", error);
    res.status(401).json({ message: "Token no válido" });
  }
};

module.exports = verifyFirebaseToken;

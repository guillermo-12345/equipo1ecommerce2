const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore({
  projectId: 'equipo1-ecommerce',
  keyFilename: './credentials/firebase-key.json'
});

const validadorJWT = (req, res, next) => {
  const token = req.header('authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición'
    });
  }

  try {
    const { id, nombre } = jwt.verify(token, process.env.JWT_SECRET);
    req.id = id;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });
  }
};

const validadorFirebase = async (req, res, next) => {
  const token = req.header('authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.uid = decodedToken.uid;
    next();
  } catch (error) {
    console.error('Token no válido:', error);
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    });
  }
};

const validadorAdmin = async (req, res, next) => {
  const firebaseUid = req.uid;
  const usuarioKey = datastore.key(['Usuario', firebaseUid]);
  const [usuario] = await datastore.get(usuarioKey);

  if (!usuario || !usuario.esAdmin) {
    return res.status(403).json({
      ok: false,
      msg: 'Acceso denegado: se requieren permisos de administrador'
    });
  }

  next();
};

module.exports = { validadorJWT, validadorFirebase, validadorAdmin };

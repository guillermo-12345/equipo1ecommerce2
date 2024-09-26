const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

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
  const firebaseToken = req.header('authorization')?.replace('Bearer ', '');

  try {

    if (!firebaseToken) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    await admin.auth().verifyIdToken(firebaseToken).then(decodedToken => {
      const uid = decodedToken.uid;
      console.log(uid);
    }).catch (error => {
      console.error(error);
      return res.status(400).json({
        ok: false,
        msg: 'Token invalido'
      });
    });

    next();
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Token no válido'
    });
  }
}; 

module.exports = { validadorJWT,validadorFirebase };

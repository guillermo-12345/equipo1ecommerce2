const admin = require('firebase-admin');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
      console.error("Authorization header missing");
      return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
      console.error("Bearer token missing in authorization header");
      return res.status(403).json({ message: 'Token format incorrect' });
  }

  admin.auth().verifyIdToken(token)
      .then((decodedToken) => {
          req.user = decodedToken;
          next();
      })
      .catch((error) => {
          console.error("Token verification failed:", error);
          res.status(403).json({ message: 'Unauthorized' });
      });
};


module.exports = { verifyToken };

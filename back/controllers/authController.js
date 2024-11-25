const admin = require('../config/firebase');
const adminEmails = ["guillermo.ibanezc@gmail.com", "trek0.88@gmail.com"];

exports.getUserRole = async (req, res) => {
  try {
    const user = await admin.auth().getUser(req.uid);
    const userRole = adminEmails.includes(user.email) ? 'admin' : 'user';
    res.json({ role: userRole });
  } catch (error) {
    console.error('Error al obtener el rol del usuario:', error);
    res.status(500).json({ error: 'Error al obtener el rol del usuario' });
  }
};

exports.loginWithGoogle = async (req, res) => {
  const { firebaseToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const user = await admin.auth().getUser(decodedToken.uid);
    const userRole = adminEmails.includes(user.email) ? 'admin' : 'user';
    console.log("Correo del usuario:", user.email);
    console.log("Rol asignado:", userRole);
    res.json({ userRole });
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    res.status(401).json({ error: 'No autorizado' });
  }
};

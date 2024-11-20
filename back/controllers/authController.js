const admin = require('firebase-admin');
const adminEmails = ["guillermo.ibanezc@gmail.com", "trek0.88@gmail.com"];

const login = async (req, res) => {
  const { firebaseToken } = req.body;

  try {
    // Verificar el token de Firebase
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const uid = decodedToken.uid;
    const user = await admin.auth().getUser(uid);

    // Asignar el rol de usuario basado en el correo electrónico
    const userRole = adminEmails.includes(user.email) ? 'admin' : 'user';
    console.log("Correo del usuario:", user.email);
    console.log("Rol asignado en el backend (login):", userRole);

    res.json({ userRole });
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    res.status(401).json({ error: 'No autorizado' });
  }
};

const getUser = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    const user = await admin.auth().getUser(uid);

    const userRole = adminEmails.includes(user.email) ? 'admin' : 'user';
    console.log("Correo del usuario en getUser:", user.email);
    console.log("Rol asignado en el backend (getUser):", userRole);

    res.json({ userRole });
  } catch (error) {
    console.error('Error al obtener el rol del usuario:', error);
    res.status(401).json({ error: 'No autorizado' });
  }
};

const verifyRole = async (req, res) => {
  const { firebaseToken } = req.body;
  try {
      const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
      const userRole = decodedToken.admin ? 'admin' : 'user'; 

      res.json({ userRole });
  } catch (error) {
      console.error("Error al verificar el rol:", error);
      res.status(401).json({ error: "No autorizado" });
  }
};

module.exports = { login, getUser,verifyRole };

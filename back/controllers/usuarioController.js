const { Datastore } = require('@google-cloud/datastore');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../../src/components/helpers/generadorJWT');

const datastore = new Datastore({
  projectId: 'equipo1-ecommerce',
  keyFilename: './credentials/firebase-key.json'
});

// Función para registrar usuario si no existe
const registerUserIfNotExists = async (req, res, next) => {
  const { uid, email } = req;

  const usuarioKey = datastore.key(['Usuario', uid]);
  try {
    const [usuario] = await datastore.get(usuarioKey);
    if (!usuario) {
   
      const usuarioData = {
        nombre: "",  
        email,
        esAdmin: false,  
        fechaRegistro: new Date(),
      };

      await datastore.save({
        key: usuarioKey,
        data: usuarioData,
      });

      console.log("Nuevo usuario registrado:", email);
    }
    next();
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({
      ok: false,
      msg: 'Error al registrar usuario',
    });
  }
};

// Crear Usuario (método manual)
const createUsuario = async (req, res) => {
  const { nombre, email, password, esAdmin = false } = req.body;

  try {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const usuarioKey = datastore.key('Usuario');
    const usuarioData = {
      nombre,
      email,
      password: hashedPassword,
      esAdmin,
      fechaRegistro: new Date(),
    };

    await datastore.save({
      key: usuarioKey,
      data: usuarioData,
    });

    const token = await generarJWT(usuarioKey.id, nombre);

    res.json({
      ok: true,
      usuario: { id: usuarioKey.id, nombre, email, esAdmin },
      token,
    });
  } catch (error) {
    console.error('Error creando usuario:', error);
    res.status(500).json({
      ok: false,
      msg: 'Error creando usuario',
    });
  }
};

// Obtener todos los Usuarios
const getUsuarios = async (req, res) => {
  try {
    const query = datastore.createQuery('Usuario');
    const [usuarios] = await datastore.runQuery(query);

    const usuariosData = usuarios.map((usuario) => ({
      id: usuario[datastore.KEY].id,
      ...usuario,
    }));

    res.json({
      ok: true,
      usuarios: usuariosData,
    });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({
      ok: false,
      msg: 'Error obteniendo usuarios',
    });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  registerUserIfNotExists, 
};

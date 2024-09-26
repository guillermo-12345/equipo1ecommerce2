const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generadorJWT');

const createUsuario = async (req, res) => {
    const usuario = req.body;

    const u = new Usuario(usuario);

    const salt = bcrypt.genSaltSync();

    u.password = bcrypt.hashSync(u.password, salt);

    const usuarioDB = await u.save();

    const token = await generarJWT(usuarioDB.id, usuarioDB.nombre);

    res.json({
        ok: true,
        usuario: usuarioDB,
        token
    });

};

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.findAll();

    res.json({
        ok: true,
        usuarios
    }); 

};

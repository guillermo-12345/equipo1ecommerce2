const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usuarioController = require('../controllers/usuarioController');
const { validarCampos } = require('../middlewares/validadorCampos');
const verifyFirebaseToken = require('../middlewares/verifyFirebaseToken');


router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  usuarioController.createUsuario
);

router.get('/', verifyFirebaseToken, usuarioController.getUsuarios);

module.exports = router;

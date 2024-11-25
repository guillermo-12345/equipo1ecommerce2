const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validarJWT = require('../middlewares/validadorJWT');

// Rutas de autenticación
router.get('/user', validarJWT, authController.getUserRole);
router.post('/login', authController.loginWithGoogle);
router.post('/logout', validarJWT, authController.logout);

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/verifyRole', authController.verifyRole);

module.exports = router;

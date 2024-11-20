const express = require('express');
const router = express.Router();
const { getProducts, addProduct, deleteProduct } = require('../controllers/productController');
const { validadorFirebase, validadorAdmin } = require('../middlewares/validadorJWT');

router.get('/products', validadorFirebase, getProducts);

router.post('/products', validadorFirebase, validadorAdmin, addProduct);
router.delete('/products/:id', validadorFirebase, validadorAdmin, deleteProduct);

module.exports = router;

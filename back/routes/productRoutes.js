
const productController = require('../controllers/productController');


router.get('/products', productController.getProducts);
router.post('/products', productController.addProduct);

module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../db'); 
router.get('/productos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener los productos:', err);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

module.exports = router;

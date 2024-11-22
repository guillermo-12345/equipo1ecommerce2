const express = require('express');
const { createOrder, getOrders, getOrderById } = require('../controllers/orderController');
const router = express.Router();

router.post('/', createOrder); // Crear una nueva orden
router.get('/', getOrders); // Obtener todas las órdenes
router.get('/:id', getOrderById); // Obtener una orden por ID

module.exports = router;

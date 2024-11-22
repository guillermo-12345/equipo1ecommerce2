const express = require('express');
const router = express.Router();
const { 
  getClients, 
  getClientById, 
  createClient, 
  updateClient, 
  deleteClient 
} = require('../controllers/clientController');

// Obtener todos los clientes
router.get('/', getClients);

// Obtener un cliente por ID
router.get('/:id', getClientById);

// Crear un nuevo cliente
router.post('/', createClient);

// Actualizar un cliente existente
router.put('/:id', updateClient);

// Eliminar un cliente
router.delete('/:id', deleteClient);

module.exports = router;

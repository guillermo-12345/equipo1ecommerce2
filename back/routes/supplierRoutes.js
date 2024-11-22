const express = require('express');
const router = express.Router();
const { 
  getSuppliers, 
  getSupplierById, 
  createSupplier, 
  updateSupplier, 
  deleteSupplier 
} = require('../controllers/supplierController');

// Obtener todos los proveedores
router.get('/', getSuppliers);

// Obtener un proveedor por ID
router.get('/:id', getSupplierById);

// Crear un nuevo proveedor
router.post('/', createSupplier);

// Actualizar un proveedor existente
router.put('/:id', updateSupplier);

// Eliminar un proveedor
router.delete('/:id', deleteSupplier);

module.exports = router;




const Supplier = require('../models/Supplier');

// Obtener todos los proveedores
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    res.status(500).json({ message: 'Error al obtener proveedores' });
  }
};

// Obtener un proveedor por ID
exports.getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);
    if (!supplier) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.status(200).json(supplier);
  } catch (error) {
    console.error('Error al obtener el proveedor:', error);
    res.status(500).json({ message: 'Error al obtener el proveedor' });
  }
};

// Crear un nuevo proveedor
exports.createSupplier = async (req, res) => {
  try {
    const { name, phone, email, category } = req.body;
    const newSupplier = await Supplier.create({ name, phone, email, category });
    res.status(201).json(newSupplier);
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    res.status(500).json({ message: 'Error al crear proveedor' });
  }
};

// Actualizar un proveedor existente
exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, category } = req.body;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) return res.status(404).json({ message: 'Proveedor no encontrado' });

    await supplier.update({ name, phone, email, category });
    res.status(200).json(supplier);
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ message: 'Error al actualizar proveedor' });
  }
};

// Eliminar un proveedor
exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) return res.status(404).json({ message: 'Proveedor no encontrado' });

    await supplier.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    res.status(500).json({ message: 'Error al eliminar proveedor' });
  }
};

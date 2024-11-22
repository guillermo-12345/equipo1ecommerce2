const Product = require('../models/Product');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
};

// Crear un producto
exports.createProduct = async (req, res) => {
  const { title, description, price, purchasePrice, category, stock, img, supplierId } = req.body;
  try {
    const product = await Product.create({ title, description, price, purchasePrice, category, stock, img, supplierId });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, purchasePrice, category, stock, img, supplierId } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.update({ title, description, price, purchasePrice, category, stock, img, supplierId });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
};

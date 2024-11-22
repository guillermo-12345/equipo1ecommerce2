const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

// Crear una nueva orden
exports.createOrder = async (req, res) => {
  const { buyer, items, total, type } = req.body;
  try {
    const order = await Order.create({ buyer, total, type });

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Producto con ID ${item.productId} no encontrado` });
      }

      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });

      if (type === 'venta') {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creando la orden:', error);
    res.status(500).json({ error: 'Error creando la orden' });
  }
};

// Obtener todas las órdenes
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: OrderItem,
        include: {
          model: Product,
          attributes: ['title', 'category'],
        },
      },
    });
    res.json(orders);
  } catch (error) {
    console.error('Error obteniendo las órdenes:', error);
    res.status(500).json({ error: 'Error obteniendo las órdenes' });
  }
};

// Obtener una orden por ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: {
        model: OrderItem,
        include: {
          model: Product,
          attributes: ['title', 'category'],
        },
      },
    });
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error obteniendo la orden:', error);
    res.status(500).json({ error: 'Error obteniendo la orden' });
  }
};

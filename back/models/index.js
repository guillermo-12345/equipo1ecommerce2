const { dbConnection } = require('../config/db');
const Supplier = require('./Supplier');
const Product = require('./Product');
const Client = require('./Client');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Purchase = require('./Purchase');

// Relaciones adicionales
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

module.exports = {
  dbConnection,
  Supplier,
  Product,
  Client,
  Order,
  OrderItem,
  Purchase,
};

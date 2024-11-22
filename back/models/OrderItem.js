// models/OrderItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');
const Product = require('./Product');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT, // Precio unitario del producto en la orden
    allowNull: false,
  },
});

// Relaciones
OrderItem.belongsTo(Order, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

module.exports = OrderItem;

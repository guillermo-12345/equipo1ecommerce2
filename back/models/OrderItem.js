const { DataTypes } = require('sequelize');
const { dbConnection } = require('../config/db');
const Order = require('./Order');
const Product = require('./Product');

const OrderItem = dbConnection.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Relaciones
OrderItem.belongsTo(Order, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

module.exports = OrderItem;

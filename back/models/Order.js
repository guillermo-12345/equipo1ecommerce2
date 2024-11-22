const { DataTypes } = require('sequelize');
const { dbConnection } = require('../config/db');

const Order = dbConnection.define('Order', {
  buyer: {
    type: DataTypes.JSON, // Detalles del cliente o proveedor
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('compra', 'venta'),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Order;

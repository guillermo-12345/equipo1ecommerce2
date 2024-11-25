const { dbConnection } = require('../config/db');
const Supplier = require('./Supplier')(dbConnection, DbConnection);
const Product = require('./Product')(dbConnection, DbConnection);
const Client = require('./Client')(dbConnection, DbConnection);
const Order = require('./Order')(dbConnection, DbConnection);
const OrderItem = require('./OrderItem')(dbConnection, DbConnection);
const Purchase = require('./Purchase')(dbConnection, DbConnection);

const dbConnection = new DbConnection(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql'
});

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

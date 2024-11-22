const { DataTypes } = require('sequelize');
const { dbConnection } = require('../config/db');

const Purchase = dbConnection.define('Purchase', {
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Suppliers',
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Purchase;

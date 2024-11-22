const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Purchase = sequelize.define('Purchase', {
  supplier_id: {
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
}, {
  timestamps: false,
});

module.exports = Purchase;
